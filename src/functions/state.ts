import type { ScheduledTask } from 'node-cron';

// Globals
const state = {
    settings: null,
    task: null,
};

// Accessors
export default {
    getSettings(): Data {
        return state.settings;
    },

    setSettings(newSettings: Data) {
        state.settings = newSettings;
    },

    getTask(): ScheduledTask {
        return state.task;
    },

    setTask(newTask: ScheduledTask) {
        state.task = newTask;
    },
};
