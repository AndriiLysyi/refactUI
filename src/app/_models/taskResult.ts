export class TaskResult {
    taskId: string;
    code: string;
    time: number;
    mistakes: Mistake[];
}

export class Mistake {
    description: string;
    severity: number;
    line: number;
    column: number;
}