
import { join } from "path";
import Structure, { BaseStructure, BaseStructureOptions } from "./structure";
import DataTemplate from "./templates/data";

export interface DataOptions extends BaseStructureOptions {
    path: string,
    namespace: string | null,
    version: number,
}

export default class Data extends BaseStructure {

    /**
     * the name the file is going to be saved as
     */
    public get filename() {
        return `${this.name}.js`;
    }

    /**
     * destination to write the file to
     * (absolute path)
     */
    public get path(): string {
        return join(
            this.folder_path,
            this.filename
        );
    }

    public static parse(args: string[]): DataOptions {
        if (args.length < 1)
            throw new Error("Wrong number of arguments, stat 0");

        let index = args.indexOf("-v");
        let version = args[index + 1];
        if (index === -1)
            version = "1";
        
        index = args.indexOf("-ns");
        let namespace: string | null = args[index + 1];
        if (index === -1)
            namespace = null;

        return {
            namespace,
            path: args[0],
            version: Number.parseInt(version),
        };
    }

    public static from(args: string[]): Data {
        return new Data(Data.parse(args));
    }

    public static generate(args: string[]): Structure[] {
        let data = Data.from(args);
    
        return [data];
    }

    constructor(args: DataOptions) {
        super(args);
    }

    public get template() {
        return DataTemplate.get_content(this.name);
    }

    protected compute_folder_path(path: string): string {
        return join(super.compute_folder_path(path), "data");
    }
}
