//import { render } from "mson-react";
//import compiler from "mson/lib/compiler";
//import "typeface-roboto";
//import { ReactFormBuilder,ReactFormGenerator } from 'react-form-builder2';
//import 'react-form-builder2/dist/app.css';
//import DemoBar from './demobar';
//import * as variables from './variable';
// const schema = yup.object().shape({
//   firstName: yup.string().required(),
//   select: yup.string().required(),
//   age: yup
//     .number()
//     .positive()
//     .integer()
//     .required(),
// });

const DayEnd = {
    cashDetail: null,
    endOfDay: null,
  };
  const CashDetail = {
    onDate: new Date(),
    coin1: 0,
    coin2: 0,
    coin5: 0,
    coin10: 0,
    c5: 0,
    c10: 0,
    c20: 0,
    c50: 0,
    c100: 0,
    c200: 0,
    c500: 0,
    c1000: 0,
    c2000: 0,
    totalAmount: 0,
  };
  const EndOfDay = {
    cashInHand: 0,
    shirting: 0.0,
    suiting: 0.0,
    eod_Date: new Date(),
    uspa: 0,
    fm_Arrow: 0,
    rtw: 0,
    access: 0,
  };
  const myForm = {
    name: "DayEnd",
    component: "Form",
    componentToWrap: "{{baseForm}}",
    fields: [
      {
        name: "onDate",
        required: true,
        component: "DateField",
        label: "Date",
      },
      {
        name: "cashInHand",
        required: true,
        component: "MoneyField",
        minValue: "1",
        label: "Cash @ Store",
      },
      {
        name: "uspa",
        label: "USPA",
        required: true,
        minValue: "0",
        component: "NumberField",
      },
      {
        name: "rtw",
        label: "RTW",
        required: true,
        component: "NumberField",
      },
      {
        name: "suiting",
        label: "Suiting",
        required: true,
        component: "NumberField",
      },
      {
        name: "shirting",
        label: "Shirting",
        required: true,
        component: "NumberField",
      },
      {
        name: "fm_Arrow",
        label: "Arrow",
        required: true,
        component: "NumberField",
      },
      {
        name: "access",
        label: "Accessories",
        component: "NumberField",
      },
      {
        name: "coin1",
        label: "Coin 1",
        required: true,
        minValue: "0",
        component: "NumberField",
      },
      {
        name: "coin2",
        label: "Coin 2",
        component: "NumberField",
      },
      {
        name: "coin5",
        label: "Coin 5",
        required: true,
        minValue: "0",
        component: "NumberField",
      },
      {
        name: "coin10",
        label: "Coin 10",
        component: "NumberField",
      },
  
      {
        name: "c5",
        label: "5",
        required: true,
        minValue: "0",
        component: "NumberField",
      },
      {
        name: "c10",
        label: "10",
        component: "NumberField",
      },
      {
        name: "c50",
        label: "50",
        required: true,
        minValue: "0",
        component: "NumberField",
      },
      {
        name: "c100",
        label: "100",
        component: "NumberField",
      },
  
      {
        name: "c20",
        label: "20",
        required: true,
        minValue: "0",
        component: "NumberField",
      },
      {
        name: "c1000",
        label: "1000",
        component: "NumberField",
      },
      {
        name: "c500",
        label: "500",
        required: true,
        minValue: "0",
        component: "NumberField",
      },
      {
        name: "c20",
        label: "20",
        component: "NumberField",
      },
      {
        name: "c2000",
        label: "2000",
        component: "NumberField",
      },
      {
        name: "Submit",
        component: "ButtonField",
        label: "Save",
      },
    ],
  };
  const myNewForm = [
    {
      key: "Header",
      name: "Header Text",
      icon: "fa fa-header",
      static: true,
      content: "Placeholder Text...",
    },
    {
      key: "Paragraph",
      name: "Paragraph",
      static: true,
      icon: "fa fa-paragraph",
      content: "Placeholder Text...",
    },
  ];
//   export function DayEndPage(){

//     const handleSubmit=() => {};
//     const handleUpdate=() => {};
//     return(<>

//     <ReactFormGenerator
//     data={EndOfDay}
//     //toolbarItems={myNewForm}
//     variables={myNewForm}
//     onChange={handleUpdate}
//     onSubmit={handleSubmit}
//     actionName={"Set this to change the default submit button text"}
//     submitButton={<button type={"submit"} className={"btn btn-primary"}>Submit</button>}
//     />

//      {/* <ReactFormGenerator
//     form_action="/path/to/form/submit"
//     form_method="POST"
//     task_id={12} // Used to submit a hidden variable with the id to the form from the database.
//     //answer_data={JSON_ANSWERS} // Answer data, only used if loading a pre-existing form with values.
//     //authenticity_token={AUTH_TOKEN} // If using Rails and need an auth token to submit form.
//     //data={JSON_QUESTION_DATA} // Question data
//   />
//     <ReactFormGenerator
//         download_path=""
//          back_action="/"
//          back_name="Back"
//          answer_data={{}}
//          action_name="Save"
//          form_action="/"
//          form_method="POST"
//          variables={variables}
//           //data={state.data}
//           /> */}
//     </>);
//   }
//export  function DayEndPage() {
// compiler.registerComponent("pages.dayEnd",myForm);

// const app = compiler.newComponent({
//     component: "App",
//     menu: {
//       component: "Menu",
//       items: [
//         {
//           path: "/stores/dayend",
//           label: "DayEnd",
//           content: {
//             component: "pages.dayEnd"
//           }
//         }
//       ]
//     }
//   });
// return (render(app));
//}  