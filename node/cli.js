import cac from 'cac'
import colors from 'picocolors'
const { yellow } = colors

const cli = cac('cli')

cli.command(
  '[template-name]',
  'template-name'
)
.option('--args [args]', `[array] args`, { type: [] })
.action(async (templateName, options) => {
  console.log(templateName, options)
})


cli.help()
// cli.version(pkg.version)

try {
  cli.parse(process.argv, { run: false })
  cli.runMatchedCommand()
} catch (error) {
  const cmd = cli.commands.find(cmd => cmd.name === cli.matchedCommandName)
  const arg = (cmd && cmd.rawName.split(' ')[1]) || ''
  cli.outputHelp()
  if (cmd && cmd.name !== '') {
    console.log(red(`\n  Missing required argument ${yellow(arg)}.`))
    process.exit(1)
  }
}
