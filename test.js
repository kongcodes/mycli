#!/usr/bin/env node
console.log("mycli命令执行成功");

const fs = require("fs");

const chalk = require("chalk");
const ora = require("ora");
const commander = require("commander");
const inquirer = require("inquirer");
const downgit = require("download-git-repo");

commander.option("--init", "this is init", () => {
  // chalk
  // const hello = chalk.red("hello");
  // const hello = chalk.blue.bgRed("hello");
  // const hello = chalk.blue.bgYellow("hello");
  const hello = chalk.rgb(200, 200, 200).bgRgb(0, 200, 3)("hello");
  console.log(hello);

  // ora
  const spinner = ora({
    text: "安装中..."
  });
  spinner.start();
  setTimeout(() => {
    // spinner.stop();
    spinner.succeed("安装成功");
    // console.log("安装成功");
  }, 1000)
})

commander.option("--number <num>", "log a number", (num) => {
  console.log(num);
})

commander.command("add user").action(() => {
  inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "请输入用户名："
    }
  ]).then((answer) => {
    console.log(answer);
  })
})

commander.command("testcon").action(() => {
  inquirer.prompt([
    {
      type: "confirm",
      name: "age",
      message: "是否大于18岁？"
    }
  ]).then((answer) => {
    console.log(answer);
  })
})

commander.command("testlist").action(() => {
  inquirer.prompt([
    {
      type: "list",
      name: "lib",
      message: "选择用到的框架：",
      choices: [
        "vue2",
        "vue3",
        "react",
        "svelte",
      ]
    }
  ]).then((answer) => {
    console.log(answer);
  })
})

// download template
commander.command("create <projectName>").action((projectName) => {
  const spinner = ora({
    text: "正在下载https://github.com/kongcodes/vue3-vant..."
  });
  spinner.start();
  fs.mkdirSync(`./${projectName}`);
  const downUrl = `${process.cwd()}\\${projectName}`;
  downgit("github:kongcodes/vue3-vant", downUrl, { clone: false }, function (err) {
    if (err) throw err;
    spinner.stop();
    console.log(chalk.green("downgit success"));
  })
})

commander.version("1.0.0");
commander.parse(process.argv); // 放在后面
