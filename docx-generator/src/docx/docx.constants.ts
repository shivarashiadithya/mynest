export const COLUMNS = {
    CONDITIONS: [
        {
            jsonKey: "text",
            value: "Condition",
            defaultValue: "",
        },
        {
            jsonKey: "clinicalStatus",
            value: "Status",
            defaultValue: "",
        },
        {
            jsonKey: "Date",
            value: "Date",
            defaultValue: new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
        }).replace(/\//g, '-'),
       }
    ],

    PROCEDURES: [
        {
            jsonKey: "text",
            value: "Procedure",
            defaultValue: "",
        },
        {
            jsonKey: "complications",
            value: "Complication",
            defaultValue: "",
        },
        {
            jsonKey: "performedDate",
            value: "Performed Date",
            defaultValue: "",
        }
    ],
    VITALS :[
        {
            jsonKey:"text",
            value :"Name",
            defaultValue: "",
        },
        {
            jsonKey: "value",
            value : "value",
            defaultValue: "",
        }
    ],
    MEDICATIONREQUESTS :[
        {
            jsonKey: "text",
            value : "Medicine",
            defaultValue: "",
        },
        {
            jsonKey: "duration",
            value: "duration",
            defaultValue: "",
        },
        {
            jsonKey: "frequency",
            value: "frequency",
            defaultValue: "",
        }
    ],
    STATEMENTS :[
        {
            jsonKey: "text",
            value: "Medicine",
            defaultValue: "",
        },
        {
            jsonKey: "dateAsserted",
            value: "Date",
            defaultValue: "",
        },
        {
            jsonKey: "reasonCode",
            value: "reason",
            defaultValue: "",
        }
    ]
}