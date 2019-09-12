
var xlsx = require('node-xlsx');
var sheets = xlsx.parse('./text.xlsx');

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.on('issue_comment.created', async context => {
    console.log('提交了')
    const {payload} = context
    const repo = payload.repository.name
    const owner = payload.repository.owner.login

    sheets.forEach(function(sheet) {
      console.log('sheets--name---', sheets.name)
      for(var rowId in sheet['data']){
        var row=sheet['data'][rowId];
        console.log('row-++++++', row);
        context.github.issues.create({owner, repo, title: row[0], body: row[1], labels: [row[2]]})
      }
    })
  })
}
