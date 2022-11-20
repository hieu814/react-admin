
var { parse } = require('csv-parse');
const createCSV = require('csv-writer').createObjectCsvWriter;
var csv = require("csvtojson");
const fs = require('fs');
const { Readable } = require('stream');
const Excel = require('exceljs');
const defaultKeys = ['number', 'image', 'audio', 'group', 'passage_image', 'passage_content', 'A', 'B', 'C', 'D', 'corectanswer', 'transcript']
function checkExcelObj(key) {
    console.log("key: ", key)
    defaultKeys.forEach(function (e) {
        if (!(key.includes(e)))
            throw Error(`Thiếu key ${e}\n Format: [number|image|audio|group|passage_image|passage_content|A|B|C|D|corectanswer|transcript]`)
    })
    return true
}
function Exam() {
    this.questions = [];
    Exam.fromJson = function (obj) {
        this.questions = obj.questions?.map(e => new GroupQuestion.fromJson(e));
    };
    this.importRawQuestion = function (obj) {

        if (obj.group) {
            let index = this.questions.findIndex(e => e.group == obj.group);
            if (index >= 0) {
                this.questions[index].importRawQuestion(obj)
            } else {
                let qs = new GroupQuestion();
                qs.importRawQuestion(obj);
                this.questions.push(qs);
            }
        } else {
            let qs = new GroupQuestion();
            qs.importRawQuestion(obj);
            this.questions.push(qs);
        }

    }
    this.fomatData = function () {
        this.questions.forEach(function (part, index) {
            this[index].fomatData();
        }, this.questions);
    }
    this.toCSV = function () {
        let rows = []
        this.questions.forEach(function (part, index) {
            let record = part.generateCSVrecord()
            rows = rows.concat(record)
            // console.log(JSON.stringify({record:rows}))
        });
        const csv = createCSV({
            path: "temp/demoD.csv",
            header: [
                { id: "number", title: "number" },
                { id: "type", title: "type" },
                { id: "group", title: "group" },
                { id: "image", title: "image" },
                { id: "audio", title: "audio" },
                { id: "passage_image", title: "passage_image" },
                { id: "passage_content", title: "passage_content" },
                { id: "question", title: "question" },
                { id: "A", title: "A" },
                { id: "B", title: "B" },
                { id: "C", title: "C" },
                { id: "D", title: "D" },
                { id: "corectanswer", title: "corectanswer" },
                { id: "transcript", title: "transcript" },
            ]
        });
        csv.writeRecords(rows)
            .then(() => { console.log("Done!"); });
    }
}
function GroupQuestion() {
    this.questions = []
    this.passages = []
    this.group = null
    this.image = null
    this.audio = null
    this.type = 0
    GroupQuestion.fromJson = function (obj) {
        this.type = obj.type || 0;
        this.questions = obj.questions.map(e => new Question(e));
    };
    this.fomatData = function () {
        this.questions.sort(function (a, b) {
            return parseInt(a.number) > parseInt(b.number);
        });
        let _from = this.questions.length > 0 ? this.questions[0].number : 0
        let _to = this.questions.length > 1 ? this.questions[this.questions.length - 1].number : _from
        this.group = {
            from: _from,
            to: _to
        }
    }
    this.importRawQuestion = function (obj) {
        // console.log(obj)
        try {
            if (obj.type) {
                if (!this.type) this.type = parseInt(obj.type)
            }

            this.group = obj.group || "";
            if (!this.image) this.image = obj.image;
            if (!this.audio) this.audio = obj.audio;
            if (obj.passage_image || obj.passage_content) {

                this.passages.push({
                    number: this.passages.length + 1,
                    image: obj.passage_image,
                    content: obj.passage_content
                })
            }
            if (obj.question && obj.question !== "") {
                this.questions.push(new Question(obj))
            }
        } catch (error) {
            throw Error(error)
        }
    }
    this.generateCSVrecord = function () {
        let _group = "Question: "
        if (this.group.from === this.group.to) _group = _group + this.group.from
        else _group = _group + this.group.from + "-" + this.group.to
        let rows = []
        let maxLen = this.questions.length > this.passages.length ? this.questions.length : this.passages.length
        for (let index = 0; index < maxLen; index++) {
            let qs = new Question({})
            let ps = {
                passage_image: "",
                passage_content: ""
            }
            if (index < this.questions.length)
                qs = this.questions[index];
            if (index < this.passages.length) {
                ps.passage_image = this.passages[index].image || ""
                ps.passage_content = this.passages[index].content || ""
            }
            const element = Object.assign(qs, ps);
            let record = {}
            record = Object.assign(record, element);
            if (record.number === 0) record.number = ""
            record.group = _group;
            record.type = this.type || 0
            if (index === 0) {
                
                record.image = this.image
                record.audio = this.audio
                console.log("image ",record.image, "groi: ", record.group)
            } else {
                record.image = ""
                record.audio = ""
            }
            rows.push(record);
        }
        return rows;
    }
}
class Question {
    constructor(obj) {
        try {
            this.number = parseInt(obj.number) || 0
            // if (this.number < 1 || this.number > 200) { throw Error(`Number = ${obj.number} không hợp lệ`) }

            this.A = obj.A || ""
            this.B = obj.B || ""
            this.C = obj.C || ""
            this.D = obj.D || ""
            this.corectanswer = obj.corectanswer || ""
            this.question = obj.question || ""
            this.transcript = obj.transcript || ""
        } catch (error) {
            throw Error(error.message)
        }

    }

}
class ExamService {
    exam = {};
    constructor() { }
    async parseExcelData(file) {
        if (!file) {
            throw Error('Please upload a file')
        }
        var workbook = new Excel.Workbook();
        exam = new Exam()
        await workbook.xlsx.load(file.buffer)
            .then(function () {
                workbook.worksheets.forEach(function (sheet) {
                    let firstRow = sheet.getRow(1);
                    if (!firstRow.cellCount) return;
                    let keys = firstRow.values;
                    if (checkExcelObj(keys))
                        console.log("OK")
                    sheet.eachRow((row, rowNumber) => {
                        if (rowNumber == 1) return;
                        let values = row.values
                        let obj = {};
                        for (let i = 1; i < keys.length; i++) {
                            obj[keys[i]] = values[i];
                        }

                        try {
                            exam.importRawQuestion(obj)

                        } catch (error) {
                            throw Error(`Tại dòng ${rowNumber} ${error.message}`)
                        }

                    })

                });

            });
        exam.fomatData();
        return JSON.stringify(_exam);

    }
    async parseCSVData(file) {
        if (!file) {
            throw Error('Please upload a file')
        }
        const _stream = Readable.from(file.buffer, { encoding: 'ascii' })
        let exam = new Exam()
        try {

            await csv()
                .fromStream(_stream)
                .subscribe(function (obj) {
                    exam.importRawQuestion(obj)
                })

        } catch (error) {
            console.log("parse CSV error", error)
        }
        exam.fomatData();
        return exam;
    }
    async toCSV(exam) {
        exam.toCSV()
    }

}
module.exports = new ExamService();