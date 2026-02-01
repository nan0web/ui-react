export default class SimpleApp {
    static from(input: any): SimpleApp;
    constructor(props: any);
    title: any;
    run(): Promise<{
        content: {
            Typography: string[];
            $variant: string;
        }[];
    }>;
}
