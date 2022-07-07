interface CommandObject {
    /** Data for the command */
    data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

    /** Function to execute when running the command */
    execute: (interaction: any) => Promise<void>;
}

interface Data {
    /** Time for the daily message */
    time: {
        /** Hour (2 digit string) */
        hour: string;

        /** Minute (2 digit string) */
        min: string;
    }
}
