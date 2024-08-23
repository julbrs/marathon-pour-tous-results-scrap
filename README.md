# Marathon pour Tous Paris 2024: scrap it!

This quick tool allow you to extract a CSV file of all times of the event "Marathon pour tous" that took place during the Olympics of Paris 2024.

It's a [**NodeJS**](https://nodejs.org/en) application, written in [**TypeScript**](https://www.typescriptlang.org) and it rely on [`pnpm`](https://pnpm.io).

To run the script, first clone this repository, then:

```
pnpm install
pnpm start
```

Then it must slowly extract the 20,000+ results from the official website. It took for me around 1h 10mn to run the script. A file `output.csv` is generated with all the data (bib, runner name, timings).

## Why?

A friend of mine have participated in the event. He wanted to dig in the results of the others runners, but he can't do that with the actual website. So I wanted to help him.

## How it work?

The official [website](https://paris-mpt.r.mikatiming.de/2024/?pidp=tracking) allow to extract the result from a single bib number. So I have guessed the number of bib first (after `20478` seems there is no more results).

I am using a simple loop to query the page for each bib number. It rely on the `fetch` tool to interact with the website, and `jsdom` to extract the information from the HTML page.

Enjoy it, share it, hack it!
