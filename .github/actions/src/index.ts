import { IncomingMessage } from "http";
import https from "https";

const JOKE_API: string = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=explicit";
const CAT_API: string = "https://api.thecatapi.com/v1/images/search";
interface Joke {
	error: boolean;
	type: "single" | "twopart";
	joke?: string;
	setup?: string;
	delivery?: string;
}

interface Cat {
	breeds: Array<Object>;
	id: string;
	url: string;
	width: number;
	height: number;
}

const date = new Date();
const todayFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

const getData = async <T>(url: string): Promise<T> => {
	return new Promise((resolve, reject) => {
		https.get(url, (res: IncomingMessage) => {
			try {
				if (res.statusCode !== 200) throw "Status code returned non 200!";

				res
					.on("data", (data: Buffer) => {
						const parsedData: T = JSON.parse(data.toString());
						resolve(parsedData);
					})
					.on("error", (err: Error) => {
						reject(err);
					});
			} catch (err: unknown) {
				reject("Something went wrong when fetching from API! (╯°□°）╯︵ ┻━┻");
			}
		});
	});
};

(async function updateReadme() {
	const [catData, jokeData] = await Promise.allSettled([getData<Cat>(CAT_API), getData<Joke>(JOKE_API)]);

	const readme = `<h1 align="left" >Hi there! 👋 <br/> I'm Derokero!</h1>

#### I like doing random things with technology and stuff!<br/>I especially like making things from scratch, it's fun and you learn a lot! :D

🌱 I’m currently learning: **Random things!**

---

#### Here's a cat!

${catData?.status === "rejected" ? catData?.reason + "<br/>Here's a fitting picture.<br/>" : ""}
<img alt="Cat" src="${catData?.status === "fulfilled" ? catData?.value[0]?.url : "https://http.cat/418"}" width="300"/>

${jokeData?.status === "fulfilled" ? (jokeData?.value?.type === "single" ? jokeData?.value?.joke : jokeData?.value?.setup) : jokeData?.reason}</br>
${jokeData?.status === "fulfilled" ? (jokeData?.value?.type === "twopart" ? jokeData?.value?.delivery : "") : ""}

_New joke and cat every day! Such Wow!_

This page was last updated automagically on: ${todayFormatted}
[![Update-Readme](https://github.com/Derokero/Derokero/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/Derokero/Derokero/actions/workflows/main.yml)

#### Languages and Tools:

---
<p align="left">
<a href="https://en.cppreference.com/w/c" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg" alt="c" width="40" height="40"/> </a>
<a href="https://en.cppreference.com/w/" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" alt="cplusplus" width="40" height="40"/> </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://www.typescriptlang.org/" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>
<a href="https://nodejs.org" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>
<a href="https://www.php.net" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" alt="php" width="40" height="40"/> </a>
<a href="https://www.gnu.org/software/bash/" target="_blank">
<img src="https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg" alt="bash" width="40" height="40"/> </a>
<a href="https://www.python.org" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a>
<span>&nbsp;</span>
</p>

<p align="left">
<a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="https://sass-lang.com" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a>
<a href="https://getbootstrap.com" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a>
<span>&nbsp;</span>
</p>

<p align="left">
<a href="https://vuejs.org/" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg" alt="vuejs" width="40" height="40"/> </a>
<a href="https://reactjs.org/" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
<a href="https://angular.io" target="_blank">
<img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> </a>
<a href="https://expressjs.com" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>
<a href="https://webpack.js.org" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/d00d0969292a6569d45b06d3f350f463a0107b0d/icons/webpack/webpack-original-wordmark.svg" alt="webpack" width="40" height="40"/> </a> 
<span>&nbsp;</span>
</p>

<p align="left">
<a href="https://www.mongodb.com/" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a>
<a href="https://mariadb.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/mariadb/mariadb-icon.svg" alt="mariadb" width="40" height="40"/> </a>
<a href="https://www.mysql.com/" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>
<span>&nbsp;</span>
</p>

<p align="left">
<a href="https://www.linux.org/" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a>
<a href="https://www.arduino.cc/" target="_blank">
<img src="https://cdn.worldvectorlogo.com/logos/arduino-1.svg" alt="arduino" width="40" height="40"/> </a>
<a href="https://git-scm.com/" target="_blank">
<img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a>
<a href="https://www.docker.com/" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a>
<a href="https://heroku.com" target="_blank">
<img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a>
<a href="https://www.nginx.com" target="_blank">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg" alt="nginx" width="40" height="40"/> </a>
<span>&nbsp;</span>
</p>
`;

	console.log(readme);
})();
