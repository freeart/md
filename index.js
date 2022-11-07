import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import markdownIt from 'markdown-it';

const md = new markdownIt();

const response = await fetch('https://raw.githubusercontent.com/freeart/md/main/README.md');
const rawMd = await response.text();

console.time("cheerio")
const $ = cheerio.load(rawMd, null, false);

const links = $('[data-type]');
links.each((i, link) => {
  if ($(link).prop('tagName') === 'A') {
    console.log($(link).attr('href'), $(link).data());
  } else if ($(link).prop('tagName') === 'DATA') {
    console.log($(md.render($(link).html())).find('a[href]').attr('href'), $(link).data());
  }
})
console.timeEnd("cheerio")
