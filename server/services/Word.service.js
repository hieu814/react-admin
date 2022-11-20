const cheerio = require("cheerio");
const request = require("request-promise");
const axios = require("axios");
const Word = require("./../models/Word.model");

const replaceAll = (str, oldChar, newChar) => {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    let tempt = str[i];

    if (tempt === oldChar) {
      tempt = newChar;
    }

    result += tempt;
  }

  return result;
};

class WordService {
  async getByName(name) {
    const rs = await Word.findOne({ name }).select("-__v");
    if (rs) return rs;

    // nếu không có từ thì crawl
    let result = {
      name,
    };

    await request(
      `http://tratu.soha.vn/dict/en_vn/${name}`,
      (error, response, html) => {
        const $ = cheerio.load(html);
        const bodyContentEl = $("#bodyContent");

        // nếu không tồn tại từ này

        if (bodyContentEl.text().indexOf("Trang này hiện chưa có") !== -1) {
          result = null;

          return;
        }

        const pronounce = bodyContentEl.find(".section-h5").find("b").text();
        result.pronounce = pronounce;

        const contentEls = bodyContentEl.find(".section-h2");

        contentEls.each((index, contentEl) => {
          console.log("--- ",contentEl)
          if (index == 0)
            result.common = this.toContent(contentEl, $).filter(
              (s) => s.type !== "Hình thái từ"
            );

          if (index == 1) result.specialized = this.toContent(contentEl, $);

          if (index == 2) result.relate = this.toRelateContent(contentEl, $);
        });
      }
    );

    if (!result) return null;

    // get usSound
    const nameTempt = replaceAll(name, "_", "+");
    const usFetchResult = await axios.get(
      `https://dict.laban.vn/ajax/getsound?accent=us&word=${nameTempt}`
    );

    const { data } = usFetchResult.data;

    if (data) {
      result.usSound = data;

      const ukFetchResult = await axios.get(
        `https://dict.laban.vn/ajax/getsound?accent=uk&word=${nameTempt}`
      );
      result.ukSound = ukFetchResult.data.data;
    } else {
      result.usSound = "";
      result.ukSound = "";
    }

    const wordRs = new Word({ ...result });
    wordRs.save();

    return result;
  }

  toRelateContent(contentEl, $) {
    const result = {};

    const typeEls = $(contentEl).find(".section-h3");

    typeEls.each((index, typeEl) => {
      const types = [];

      $(typeEl)
        .find(".section-h5")
        .each((index, meanEl) => {
          const type = $(meanEl).find("h5").text();

          const value = [];
          $(meanEl)
            .find("dl")
            .find("dd")
            .find("a")
            .each((index, El) => value.push($(El).text()));

          types.push({ type, value });
        });

      if (index == 0) result.synonymous = [...types];
      else result.antonym = [...types];
    });

    return result;
  }

  toContent(contentEl, $) {
    const result = [];

    const typeEls = $(contentEl).find(".section-h3");

    typeEls.each((index, typeEl) => {
      const type = {};
      result.push(type);

      type.type = $(typeEl).find("h3").text().trim();

      type.means = [];

      $(typeEl)
        .find(".section-h5")
        .each((index, meanEl) => {
          const value = $(meanEl).find("h5").text().trim();

          const examples = [];
          const example = {};
          $(meanEl)
            .find("dl")
            .find("dd")
            .find("dl")
            .find("dd")
            .each((index, exampleEl) => {
              if (index % 2 == 0) example.key = $(exampleEl).text().trim();
              else {
                example.value = $(exampleEl).text().trim();
                examples.push({ ...example });
              }
            });

          type.means.push({ value, examples });
        });
    });

    return result;
  }

  async crawlWord(url, type) {}
}

module.exports = new WordService();
