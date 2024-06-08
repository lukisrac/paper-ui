export type CxClassValue = string | null | boolean | undefined;

export function cx(...classes: CxClassValue[]): string {
    let i = 0,
        tmp,
        str = "";

    for (; i < classes.length; i++) {
        if ((tmp = classes[i])) {
            if (typeof tmp === "string") {
                str += (str && " ") + tmp;
            }
        }
    }

    return str;
}
