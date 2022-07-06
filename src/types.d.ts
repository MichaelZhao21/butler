interface CommandObject {
    /** Data for the command */
    data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

    /** Function to execute when running the command */
    execute: (interaction: any) => Promise<void>;
}
