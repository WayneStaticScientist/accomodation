import { ReactNode } from "react";


export default class VertexParser {
    constructor() {

    }
    async parse(data: string): Promise<ReactNode[]> {
        const childrens: ReactNode[] = [];
        const array = data.split("")
        let index = 0;
        const getTokens = () => {
            const x = array[index]
            if (x == '[') {
                index++;
                if (index >= array.length) return
                const secondX = array[index]
                if (secondX != '"') {
                    index--;
                    return
                }
                index++;

                let styles = "";
                while (index < array.length && array[index] != '"') {
                    styles += array[index];
                    index++;
                }
                index++;
                if (index >= array.length) return
                while (array[index] == ' ' && index < array.length) {
                    index++;
                }
                if (index >= array.length) return;
                let content = "";
                while (index < array.length && array[index] != ']') {
                    content += array[index];
                    index++;
                }
                if (index >= array.length) return;
                index++;
                childrens.push(<div className={styles} >{content}</div>)
            }
            let template = "";
            while (index < array.length && array[index] != '[') {
                template += array[index];
                index++;
            }
            childrens.push(<>{template}</>)
        }
        while (index < array.length) {
            getTokens()
        }
        return childrens;
    }

}
