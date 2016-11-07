
import {ISchemaObject, PersistentObject, SchemaObject} from "../SchemaObject";
import {IObjectDesignerFormat} from "../../designer/ObjectDesignerFormat";
import {Action} from "../../designer/Action";
import {ArrayAttrEditor, IArrayAttrEditor} from "../../designer/editors/ArrayAttrEditor";

export interface ISchemaComponent extends ISchemaObject {
    children: ISchemaComponent[];

}

export class SchemaComponent extends SchemaObject<ISchemaComponent> {

    static getClassName(): string {
        return "buhta.SchemaComponent";
    }

    static getClassTitle(): string {
        return "компонент";
    }

    static createNew(): ISchemaComponent {
        let obj:ISchemaComponent=SchemaObject.createNew() as any;
        obj._class=this.getClassName();
        obj.name= "Новый компонент";
        obj.children=[];
        return obj;
    }

    getDesignerFormat(): IObjectDesignerFormat {
        let ret = super.getDesignerFormat();
        //ret.attributes.push({attrName: "sqlName", title: "имя таблицы", _class: StringAttrEditor.getClassName()});

        let childrenEditor: IArrayAttrEditor = {
            attrName: "children",
            title: "компоненты",
            _class: ArrayAttrEditor.getClassName(),
            actions: [
                {
                    _class: Action.getClassName(), text: "добавить компонент", onClick: ()=> {
                    let newCol = SchemaComponent.createNew();
                    this.obj.children.push(newCol);
                    return newCol;
                }
                }
            ]
        };
        ret.arrays.push(childrenEditor);

        ret.getTitle = (obj: ISchemaComponent)=> {
            return obj.name + "  (" + SchemaComponent.getClassTitle() + ")";
        };

        return ret;
    }

    prepareToSave() {

    }

    validate(errors: string[]) {
        // let errTitle = "Ошибка в таблице '" + this.obj.name + "': ";
        //
        // this.obj.name = this.obj.name.trim();
        //
        // if (this.obj.name.length === 0)
        //     errors.push(errTitle + "'имя таблицы' не может быть пустым");
        //
        // if (this.obj.name.startsWith("#"))
        //     errors.push(errTitle + "'имя таблицы' не может начинаться с символа #");
        //
        // if (this.obj.columns.length === 0) {
        //     errors.push(errTitle + "список колонок пуст");
        // }
        //
        // this.columns.forEach((col: SqlTableColumn)=> {
        //     col.validate(errors);
        // });
        //
        // // this.indexes.forEach((tableIndex: SchemaTableIndex)=> {
        // //     tableIndex.$$validate(errors);
        // //     if (tableIndex.table!==this)
        // //         errors.push(errTitle + "internal error 'index.table!==table'");
        // //
        // // });
    }

}


