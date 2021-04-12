#!/usr/bin/env node

const shell = require('shelljs')

shell.cd('~')

if (shell.exec('ls').code !== 0) { // 0을 전달하면 정상 종료
    shell.echo('Error: command failed')
    shell.exit(1) //외부 (예) 창 cmd) 명령을 실행합니다.
}