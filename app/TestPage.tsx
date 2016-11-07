import * as React from "react";
import * as mongoose from "mongoose";
//import * as mongoose from "mongoose";
import {MongoClient} from "mongodb";
import {convertDocs} from "./mag3305";
import {convertMikDocs} from "./mik";
import {getSchema} from "./buhta-core/schema/Schema";
import {SqlTable} from "./buhta-core/schema/SqlTable/SqlTable";
import {SqlTableColumn} from "./buhta-core/schema/SqlTable/SqlTableColumn";
import {ISqlStringDataType, SqlStringDataType} from "./buhta-core/schema/SqlTable/SqlStringDataType";
import {ISchemaObject, SchemaObject} from "./buhta-core/schema/SchemaObject";
import {GridLayout} from "./buhta-core/component/GridLayout";
import {PersistentPage, IPersistentPageProps, PersistentPageComponent} from "./buhta-core/component/PersistentPage";
import {IDialogProps, showDialog} from "./buhta-core/ui/Dilaog";
import {TestDialogContent} from "./testDialogContent";
import jqxButton = jqwidgets.jqxButton;
var sql = require('mssql');

var sqlconfig = {
    user: 'sa',
    password: '',
    server: 'dark',
    database: "mag3666",
    options: {
        instanceName: "sql2012"
    }
};


interface IUser extends mongoose.Document {
    provider: string;
    id: string;
    authorId: string;
    displayName: string;
    emails: any;
    photos: any;
    show: boolean;
    created: Date;
    updated: Date;
}

var _schema: mongoose.Schema = new mongoose.Schema({
    provider: {
        type: String,
        require: true
    },
    id: {
        type: String,
        require: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    displayName: {
        type: String
    },
    emails: {
        type: mongoose.Schema.Types.Mixed
    },
    photos: {
        type: mongoose.Schema.Types.Mixed
    },
    show: Boolean,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
})
    .pre('save', function (next) {
        this.updated = new Date();
        next();
    });

var _model = mongoose.model < IUser >('User', _schema);

export class TestPage extends React.Component<any,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }


    handleClick1 = ()=> {
        //createSqlTable_test();
        //var mongoose = require('mongoose');
        // mongoose.connect('mongodb://KostiaSA:sonyk795@ds061206.mlab.com:61206/margo');
        //
        // var Cat = mongoose.model('Cat', {name: String});
        //
        // var kitty = new Cat({name: 'Zildjian'});
        // kitty.save(function (err: string) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log('meow');
        //     }
        // });
    };

    handleClick2 = ()=> {
        console.log("click2");
        this.printDelayed();
    };

    async my1(): Promise<string> {
        var p = new Promise<string>(resolve => {
            setTimeout(() => resolve('done!'), 1000);
        });
        return p;
    }


    handleClick3 = ()=> {
        console.log("click3");

        // let x=MongoClient;
        //
        // var MongoClient1 = require('mongodb').MongoClient
        //     , assert = require('assert');

        var url = 'mongodb://KostiaSA:sonyk795@ds061206.mlab.com:61206/margo';
        MongoClient.connect(url, function (err: any, db: any) {
            //assert.equal(null, err);
            console.log("Connected correctly to server");
            console.log(db);

            var collection = db.collection('documents');
            // Insert some documents
            collection.insert([
                {a: 1}, {a: 2}, {a: 3}
            ], function (err: any, result: any) {
                console.log(result);
                //assert.equal(3, result.result.n);
                //assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the document collection");
                //callback(result);
            });


            db.close();
        });
    };

    handleClick4 = ()=> {
        console.log("click4");
        convertDocs();
    };
    handleClick2008 = ()=> {
        console.log("click2008");
        convertMikDocs("2008");
    };
    handleClick2009 = ()=> {
        console.log("click2009");
        convertMikDocs("2009");
    };
    handleClick2010 = ()=> {
        console.log("click2010");
        convertMikDocs("2010");
    };
    handleClick2011 = ()=> {
        console.log("click2011");
        convertMikDocs("2011");
    };
    handleClick2012 = ()=> {
        console.log("click2012");
        convertMikDocs("2012");
    };
    handleClick2013 = ()=> {
        console.log("click2013");
        convertMikDocs("2013");
    };

    handleClickSchema = ()=> {
        console.log("clickSchema");

        let table = SqlTable.createNew();
        let col = SqlTableColumn.createNew();
        col.name = "номер1";
        col.description = "номер организации1";
        col.dataType = SqlStringDataType.createNew();
        table.columns.push(col);

        getSchema().saveObject(table);


        // getSchema().getObject("").then((obj: any)=> {
        //     console.log(obj);
        // });
    };

    handleClickSchemaLoad = ()=> {
        console.log("clickSchemaLoad");

        // getSchema().getObject(new ObjectID("580f1b6a5d4c403630eeb642")).then((x: ISchemaObject)=> {
        //     console.log(x);
        // });
        //
        // getSchema().getObject(new ObjectID("580f1b6a5d4c403630eeb642")).then((x: ISchemaObject)=> {
        //     console.log(x);
        // });
        //
        // getSchema().getObjectClassInstance(new ObjectID("580f1b6a5d4c403630eeb642")).then((x: SchemaObject<ISchemaObject>)=> {
        //     console.log(x);
        // });


        // getSchema().getObject("").then((obj: any)=> {
        //     console.log(obj);
        // });
    };

    ppProps: IPersistentPageProps;


    async createGrid() {
        await sql.connect(sqlconfig);
        let recordset = await new sql.Request().query("select top 100000 Номер,Название,_Модель from ТМЦ") as any[];//
        console.log(recordset.length);

        var source =
        {
            localdata: recordset,
            datatype: "array"
        };
        var dataAdapter = new $.jqx.dataAdapter(source, {
            //downloadComplete: function (data, status, xhr) { },
            //loadComplete: function (data) { },
            //loadError: function (xhr, status, error) { }
        });

        let options: jqwidgets.GridOptions = {
            rowsheight:23,
            theme:"buhta",
            width: 600,
            height: 700,
            source: dataAdapter,
            pageable: false,
            autoheight: false,
            sortable: true,
            enablebrowserselection:true,
            altrows: false,
            enabletooltips: false,
            editable: false,
            //selectionmode: 'multiplecellsadvanced',
            columns: [
                { text: 'Product Name',  datafield: 'Номер', width: 100 },
                { text: 'Quantity per Unit', datafield: 'Название'},//, cellsalign: 'right', align: 'right', width: 200 },
                { text: 'Модель', datafield: '_Модель'}//, cellsalign: 'right', align: 'right', width: 200 },
                //{ text: 'Unit Price', columngroup: 'ProductDetails', datafield: 'UnitPrice', align: 'right', cellsalign: 'right', cellsformat: 'c2', width: 200 },
                //{ text: 'Units In Stock', datafield: 'UnitsInStock', cellsalign: 'right', cellsrenderer: cellsrenderer, width: 100 },
                //{ text: 'Discontinued', columntype: 'checkbox', datafield: 'Discontinued' }
            ],
            // columngroups: [
            //     { text: 'Product Details', align: 'center', name: 'ProductDetails' }
            // ]
        };
        // creates an instance
        let myGrid: jqwidgets.jqxGrid = jqwidgets.createInstance("#q123", 'jqxGrid', options);
    }


    render(): JSX.Element {


        if (this.ppProps === undefined) {
            getSchema().getObject("u1oxh7gz75gw8dm6t0u5o2")
                .then((obj: any)=> {
                    this.ppProps = obj;
                    this.forceUpdate();
                });

            return <div>загрузка...</div>
        }
        else
            return (
                <div>тестовая стра!
                    <div id="q123">?</div>
                    <button onClick={()=>{
                    let d:IDialogProps={
                      _class:"",
                      height:300,
                      width:400,
                 //     border:"thin",
                          content:<TestDialogContent/>
                    }
                   // showDialog(d);

                    //let but:jqxButton=jqwidgets.createInstance("#q123", 'jqxButton', {value:"<b>уроды</b>"});
                    this.createGrid();

                    }}>test Dialog
                    </button>
                </div>
            )
        // return (
        //     <div>тестовая стра!
        //         <button onClick={this.handleClick1}>mongo test1</button>
        //         <button onClick={this.handleClick2}>test2</button>
        //         <br/>
        //         <button onClick={this.handleClick3}>MONGO DIRECT test</button>
        //         <br/>
        //         <br/>
        //         <button onClick={this.handleClick4}>MONGO CONVERT MAG3305</button>
        //         <br/>
        //         <br/>
        //         <button onClick={this.handleClickSchema}>TEST SCHEMA CREATE</button>
        //         <br/>
        //         <button onClick={this.handleClickSchemaLoad}>TEST SCHEMA LOAD</button>
        //         <br/>
        //         <PersistentPageComponent {...this.ppProps}>
        //
        //         </PersistentPageComponent>
        //     </div>
        // );
    }


    async printDelayed() {
        let x: string = await this.my1();
        console.log(x);
    }
}


