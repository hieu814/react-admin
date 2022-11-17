
var { parse } = require('csv-parse');
const createCSV = require('csv-writer').createObjectCsvWriter;
var csv = require("csvtojson");
const fs = require('fs');
const { Readable } = require('stream');
const Excel = require('exceljs');
const defaultKeys = ['number', 'image', 'audio', 'group', 'passage_image', 'passage_content', 'A', 'B', 'C', 'D', 'corectAnswer', 'transcript']
function checkExcelObj(key) {
    console.log("key: ", key)
    defaultKeys.forEach(function (e) {
        if (!(key.includes(e)))
            throw Error(`Thiếu key ${e}\n Format: [number|image|audio|group|passage_image|passage_content|A|B|C|D|corectAnswer|transcript]`)
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
    this.generateCSVrecord = function () {
        const qs2 = new Question({})
        console.log({ qs2 })
        let csv_record = []
        this.questions.forEach(function (qs) {
            csv_record.push(qs.generateCSVrecord())
        })

    }
    this.generateCSV = function (path) {
        const csv = createCSV({
            path: "demoD.csv",
            header: [
                { id: "number", title: "image" },
                { id: "image", title: "image" },
                { id: "audio", title: "audio" },
                { id: "group", title: "group" },
                { id: "passage_image", title: "passage_image" },
                { id: "A", title: "A" },
                { id: "B", title: "B" },
                { id: "C", title: "C" },
                { id: "D", title: "D" },
                { id: "corectAnswer", title: "corectAnswer" }
            ]
        });
        csv.writeRecords([
            { ani: "Doge", desc: "Goodest Boy" },
            { ani: "Cate", desc: "Evil" },
            { ani: "Birb", desc: "Happy Wings" }
        ])
            .then(() => { console.log("Done!"); });
    }
}
function GroupQuestion() {
    this.questions = []
    this.passages = []
    this.group = null
    this.image = null
    this.audio = null
    GroupQuestion.fromJson = function (obj) {
        this.type = obj.type;
        this.questions = obj.questions.map(e => new Question(e));
    };
    this.importRawQuestion = function (obj) {
        // console.log(obj)
        try {
            if (obj.group) {
                this.group = obj.group;
            }
            if (obj.image) {
                this.image = obj.image;
            }
            if (obj.audio) {
                this.audio = obj.audio;
            }
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
        let maxLen = this.questions.length > this.passages.length ? this.questions.length : this.passages.length
        for (let index = 0; index < maxLen; index++) {
            if (index < this.questions.length) {
                const qs = questions[index];
            }


        }
    }
}
class Question {
    constructor(obj) {
        try {
            this.number = parseInt(obj.number) || 0
            if (this.number < 1 || this.number > 200) { throw Error(`Number = ${obj.number} không hợp lệ`) }

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
    async toCSV() {

    }
    // number = 0;
    // A = "";
    // B = "";
    // C = "";
    // D = "";
    // corectanswer = "";
    // question = "";
    // transcript = "";

}
class ExamParser {
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
        return JSON.stringify(_exam);

    }
    async parseCSVData(file) {
        if (!file) {
            throw Error('Please upload a file')
        }
        const _stream = Readable.from(file.buffer, { encoding: 'ascii' })
        let _exam = new Exam()
        try {

            await csv()
                .fromStream(_stream)
                .subscribe(function (obj) {
                    _exam.importRawQuestion(obj)
                })

        } catch (error) {
            console.log("parse CSV error", error)
        }
        return _exam;//JSON.stringify(_exam);
    }
    async toCSV(exam) {
        let ex = new Exam.fromJson(exam)
        ex.generateCSVrecord
    }

}
module.exports = new ExamParser();