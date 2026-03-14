import { Block, BlockFigure, Elem } from "./leaf-blocks";
import { markRaw } from "vue";
import VRangeField from "../../components/controls/RangeField.vue";
import VTextBox from "../../components/controls/TextBox.vue";
import VNumberBox from "../../components/controls/NumberBox.vue";
import VTagsField from "../../components/controls/TagsField.vue";
import VSwitchField from "../../components/controls/SwitchField.vue";
import VMultiChoiceField from "../../components/controls/MultiChoiceField.vue";
import VFileField from "../../components/controls/FileField.vue";
import VDateTimeField from "../../components/controls/DateTimeField.vue";
import VSelectField from "../../components/controls/SelectField.vue";
import he from "he";

/**
 * Format a Date object according to the given format string.
 * Supports the subset of formats used by TemporalField:
 *   "YYYY-MM-DDTHH:mm:ss", "YYYY-MM-DD", "HH:mm:ss"
 */
function formatDate(date: Date, format: string): string {
    const pad = (n: number) => n.toString().padStart(2, "0");
    const YYYY = date.getFullYear().toString();
    const MM = pad(date.getMonth() + 1);
    const DD = pad(date.getDate());
    const HH = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());

    return format
        .replace("YYYY", YYYY)
        .replace("MM", MM)
        .replace("DD", DD)
        .replace("HH", HH)
        .replace("mm", mm)
        .replace("ss", ss);
}

/**
 * Parse an initial value string into a Date.
 * If parseFormat is "HH:mm:ss", treats the value as a time on today's date.
 * Otherwise, relies on native Date parsing (ISO 8601 formats).
 */
function parseInitial(value: string, parseFormat?: string): Date {
    if (parseFormat === "HH:mm:ss") {
        const [h, m, s] = value.split(":").map(Number);
        const d = new Date();
        d.setHours(h, m, s, 0);
        return d;
    }
    return new Date(value);
}

const parseJsonProp = (json: string): Record<string, unknown> | string[] =>
    /**
     * Decode HTML entities and parse as JSON,
     * e.g. `"[&quot;foo&qout;]"` -> `["foo"]`
     */
    JSON.parse(he.decode(json));

export abstract class ControlsField extends Block {
    public constructor(elem: Elem, figure: BlockFigure) {
        super(elem, figure); // TODO -- `figure` is unused, should use new base class?
        const { helpText, name, required, initial, label } = elem.attributes;
        this.componentProps = {
            ...this.componentProps,
            helpText,
            name,
            label,
            initial,
            required: required ? JSON.parse(required) : undefined,
        };
    }
}

export class RangeField extends ControlsField {
    public component = markRaw(VRangeField);

    public constructor(elem: Elem, figure: BlockFigure) {
        super(elem, figure);
        const { min, max, step, initial } = elem.attributes;
        this.componentProps = {
            ...this.componentProps,
            min: +min,
            max: +max,
            step: +step,
            initial: +initial,
        };
    }
}

export class TextBox extends ControlsField {
    public component = markRaw(VTextBox);
}

export class NumberBox extends ControlsField {
    public component = markRaw(VNumberBox);

    public constructor(elem: Elem, figure: BlockFigure) {
        super(elem, figure);
        const { initial } = elem.attributes;
        this.componentProps = {
            ...this.componentProps,
            initial: +initial,
        };
    }
}

export class TagsField extends ControlsField {
    public component = markRaw(VTagsField);

    public constructor(elem: Elem, figure: BlockFigure) {
        super(elem, figure);
        const { initial } = elem.attributes;
        this.componentProps = {
            ...this.componentProps,
            initial: initial ? parseJsonProp(initial) : [],
        };
    }
}

export class MultiChoiceField extends ControlsField {
    public component = markRaw(VMultiChoiceField);

    public constructor(elem: Elem, figure: BlockFigure) {
        super(elem, figure);
        const { initial, options } = elem.attributes;
        this.componentProps = {
            ...this.componentProps,
            options: JSON.parse(options),
            initial: initial ? parseJsonProp(initial) : [],
        };
    }
}

export class FileField extends ControlsField {
    public component = markRaw(VFileField);

    public constructor(elem: Elem, figure: BlockFigure) {
        super(elem, figure);
    }
}

export class TemporalField extends ControlsField {
    public component = markRaw(VDateTimeField);

    public constructor(elem: Elem, figure: BlockFigure, opts?: any) {
        super(elem, figure);
        const { initial } = elem.attributes;
        const { timeFormat, type, parseFormat } = opts;
        this.componentProps = {
            ...this.componentProps,
            // initial may be undefined -> new Date() gives us current datetime
            // parseFormat may be undefined -> native Date does automatic datetime parsing
            initial: formatDate(
                initial ? parseInitial(initial, parseFormat) : new Date(),
                timeFormat,
            ),
            type,
        };
    }
}

export class SelectField extends ControlsField {
    public component = markRaw(VSelectField);
    public options: string[];

    public constructor(elem: Elem, figure: BlockFigure) {
        super(elem, figure);
        const { initial, options } = elem.attributes;
        this.options = parseJsonProp(options) as string[];

        this.componentProps = {
            ...this.componentProps,
            options: this.options,
            initial: initial || this.options[0],
        };
    }
}

export class SwitchField extends ControlsField {
    public component = markRaw(VSwitchField);

    public constructor(elem: Elem, figure: BlockFigure) {
        super(elem, figure);
        const { initial } = elem.attributes;
        this.componentProps = {
            ...this.componentProps,
            initial: initial ? JSON.parse(initial) : false,
        };
    }
}
