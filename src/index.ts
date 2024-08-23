import { JSDOM } from "jsdom";
import { Result } from "./model.js";

import { stringify } from "csv-stringify/sync";
import { writeFileSync } from "fs";

const LAST_BIB = 20478;

const readResultPage = async (bibNumber: number) => {
  const formData = new FormData();
  formData.append("lang", "EN_CAP");
  formData.append("startpage", "start_responsive");
  formData.append("startpage_type", "search");
  formData.append("event", "MPT");
  formData.append("search[start_no]", bibNumber.toString());
  formData.append("submit", "");
  const response = await fetch("https://paris-mpt.r.mikatiming.de/2024/?pid=search&pidp=tracking", {
    method: "POST",
    body: formData,
  });
  const text = await response.text();

  const { document } = new JSDOM(text).window;

  const data: Result = {
    number: document.querySelector("td.f-start_no_text")?.textContent ?? undefined,
    fullName: document.querySelector("td.f-__fullname")?.textContent ?? undefined,
    halfFirst: document.querySelector("td.f-time_06")?.textContent ?? undefined,
    halfSecond: document.querySelector("td.f-time_19")?.textContent ?? undefined,
    timeTotalNetto: document.querySelector("td.f-time_finish_netto")?.textContent ?? undefined,
    timeTotalBrutto: document.querySelector("td.f-time_finish_brutto")?.textContent ?? undefined,
    time5k: document.querySelector(".f-time_02 > .time")?.textContent ?? undefined,
    time10k: document.querySelector(".f-time_03 > .time")?.textContent ?? undefined,
    time15k: document.querySelector(".f-time_04 > .time")?.textContent ?? undefined,
    time20k: document.querySelector(".f-time_05 > .time")?.textContent ?? undefined,
    timeHalf: document.querySelector(".f-time_06 > .time")?.textContent ?? undefined,
    time25k: document.querySelector(".f-time_07 > .time")?.textContent ?? undefined,
    time30k: document.querySelector(".f-time_08 > .time")?.textContent ?? undefined,
    time35k: document.querySelector(".f-time_09 > .time")?.textContent ?? undefined,
    time40k: document.querySelector(".f-time_10 > .time")?.textContent ?? undefined,
    timeFinish: document.querySelector(".f-time_finish_netto > .time")?.textContent ?? undefined,
  };

  return data;
};

let resultList: Result[] = [];

// scan all bibs!
for (let bib = 0; bib < LAST_BIB; bib++) {
  // output for every 100 bibs
  if (bib % 100 === 0) {
    console.log(`${new Date().toISOString()} Progress: ${(bib / LAST_BIB) * 100}%`);
  }
  // read a bib
  const data = await readResultPage(bib);
  // push to list only if defined
  if (data.number !== undefined) {
    resultList.push(data);
  }
}

// write data to CSV file
const output = stringify(resultList, {
  header: true,
});

writeFileSync("output.csv", output);
