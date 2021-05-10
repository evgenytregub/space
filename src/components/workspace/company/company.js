import React, {Component} from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ReactDOM from 'react-dom';

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockWidth: 0,
            screenHeight: 0,
            data: {},
            dataVisible: {}

        }

        this.companyTemplate = this.companyTemplate.bind(this);
        this.requestData = this.requestData.bind(this);
    }

    companyTemplate() {
        let companyData = this.requestData ();
        let block = '';
        let top = 0;
        let left = 0;
        let width = 200;
        let height = 50;
        let distanceY = 25;
        let distanceX = 25;
        let structure = {};

        for (let key in companyData) {
            structure[companyData[key].name] = {parentName: companyData[key].name, childrenName: [], parent: companyData[key].parent};
        }

        for (let keyS in structure) {
            for (let keyC in companyData) {
                if (structure[keyS].parentName === companyData[keyC].parent) {
                   structure[keyS].childrenName.push(companyData[keyC]);
                } }
       }



        //console.log(structure);
        block = block + `<div  style="position: absolute; z-index: 990; left: ` + left + `px; top: ` + top + `px; height: 50px; width: ` + width + `px; background-color: #CCCCCC">`+
                `<div style="position: relative; ">`
                    + structure[Object.keys(structure)[0]].parentName +
                    `<button onClick={this.getChildren} style="position: absolute;  top: 36px; border-radius: 50%; border: none; left: 90px" >`
                        + '+' +
                    `</button>`+
                `</div>`+

            `</div>`;





        for (let key in structure) {
            let children = structure[key].childrenName.length;
            let length = children * (width + distanceX);
            top = Number(top) + 50 + Number(distanceY);
            if (children === 1) {
                left = left;
            } else {
                left = left - width / 2 - distanceX / 2 - length/2;
            }
            for (let i = 0; i < children; i++) {
                if (children === 1) {
                    left = left;
                } else {
                    left = left + width + distanceX;
                }
                const test = structure[key].childrenName[i];
                block = block + `<div style="position: absolute; z-index: 990; left: ` + left + `px; top: ` + top + `px; height: 50px; width: ` + width + `px; background-color: #CCCCCC">` + test.name + ` - ` + left + `</div>`;
            }
        }

        for (let key in companyData) {
            if (companyData[key].parent === '') {
                top = 50;
                left = 500;
            } else {
                top = companyData[companyData[key].parent].top + height + distanceY;
                left = companyData[companyData[key].parent].left;
            }
            companyData[key].top = top;
            companyData[key].left = left;
        }

        let topList = [];
        for (let key in companyData) {
            if (topList.indexOf(companyData[key].top) === -1){
                topList.push(companyData[key].top);
            }
        }

        for (let i = 0; i < topList.length; i++) {
            for (let key in companyData) {
                if (companyData[key].top === topList[i]) {
                    left = left + width + distanceX;
                    companyData[key].left = left;
                }
            }
        }


        for (let i = topList.length; i != -1; i--) {
            for (let key in companyData) {
                if (companyData[key].top === topList[i]) {
                    left = left + width + distanceX;
                    companyData[key].left = left;
                }
            }
        }

        for (let key in companyData) {
            block = block + `<div style="position: absolute; z-index: 990; left: ` + companyData[key].left + `px; top: ` + companyData[key].top + `px; height: ` + height + `px; width: ` + width + `px; background-color: #CCCCCC">` + companyData[key].name + ` - ` + companyData[key].left + `</div>`;
        }

        console.log(companyData);
        console.log(structure);
        console.log(topList);
        return block;
    }

    getChildren(e, empName){

        const newVisibleEmployees = [];
        for (let key in this.state.data) {

            if(this.state.data[key].parent === empName){
                newVisibleEmployees.push(this.state.data[key]);
            }

        }
        console.log(newVisibleEmployees);
        const newDataShow = [...this.state.dataVisible, ...newVisibleEmployees];

        console.log(newDataShow);


        this.setState(() => {
            return {

                dataVisible: newDataShow
            }
        })


        e.target.style.display = 'none';
        e.target.previousElementSibling.style.display = 'block';
    }
    notChildren(e, empName){
        const newVisibleEmployees = [];

        const visibleEmployees = [...this.state.dataVisible];
        visibleEmployees.forEach((item) => {
            if(item.parent !== empName){
                newVisibleEmployees.push(item);
            }
        })


        this.setState(() => {
            return {

                dataVisible: newVisibleEmployees
            }
        })

        e.target.style.display = 'none';
        e.target.nextElementSibling.style.display = 'block';

    }
    requestData () {
        let companyData = {
            'employee1': {'name': 'employee1', 'parent': ''},
            'employee2': {'name': 'employee2', 'parent': 'employee1'},
            'employee3': {'name': 'employee3', 'parent': 'employee2'},
            'employee4': {'name': 'employee4', 'parent': 'employee2'},
            'employee5': {'name': 'employee5', 'parent': 'employee2'},
            'employee6': {'name': 'employee6', 'parent': 'employee1'},
            'employee7': {'name': 'employee7', 'parent': 'employee1'},
            'employee8': {'name': 'employee8', 'parent': 'employee7'},
            'employee9': {'name': 'employee9', 'parent': 'employee3'},
            'employee10': {'name': 'employee10', 'parent': 'employee3'},
            'employee11': {'name': 'employee11', 'parent': 'employee7'},
            'employee12': {'name': 'employee12', 'parent': 'employee6'},
            'employee13': {'name': 'employee13', 'parent': 'employee1'},
            'employee14': {'name': 'employee14', 'parent': 'employee1'},
            'employee15': {'name': 'employee15', 'parent': 'employee1'},
            'employee16': {'name': 'employee16', 'parent': 'employee1'},
            'employee17': {'name': 'employee17', 'parent': 'employee1'},
            'employee18': {'name': 'employee18', 'parent': 'employee1'},
            'employee19': {'name': 'employee19', 'parent': 'employee1'},
            'employee20': {'name': 'employee20', 'parent': 'employee1'},
        }

        return companyData;
    }


    componentDidMount() {
        const wrapperWidth = document.getElementsByClassName('wrapper')[0].offsetWidth;
        const maxHeight = document.documentElement.clientHeight;
        let companyData = this.requestData ();

        let structure = {};


        for (let key in companyData) {

            structure[companyData[key].name] = {parentName: companyData[key].name, childrenName: [], parent: companyData[key].parent};
        }

        for (let keyS in structure) {
            for (let keyC in companyData) {
                if (structure[keyS].parentName === companyData[keyC].parent) {
                    structure[keyS].childrenName.push(companyData[keyC]);
                } }
        }
        const showEmployee = [];

        for (let key in structure) {

            if(structure[key].parent === ''){
                structure[key].level = 1;
            }
            else{
                structure[key].level = structure[structure[key].parent].level + 1;
            }



        }
        console.log(structure);

        let level = 1;
        for (let key in structure) {

            if(level < 4){
                for (let key in structure) {

                    if(structure[key].level === level){

                        if(showEmployee.indexOf(structure[key]) === -1){
                            showEmployee.push(structure[key]);
                        }


                    }

                }


                /*f(structure[structure[key].parentName].childrenName.length > 0){
                    structure[structure[key].parentName].childrenName.forEach((item)=>{
                        for (let keyD in structure) {
                            if(item.name === structure[structure[keyD].parentName].parentName){
                                showEmployee.push(structure[structure[keyD].parentName]);

                            }
                        }
                    })
                }


                parent = structure[key].parentName;*/

                level = level+1;

            }

        }
        console.log(showEmployee);





        this.setState(() => {
            return {
                blockWidth: wrapperWidth,
                screenHeight: maxHeight,
                data: structure,
                dataVisible: showEmployee
            }
        })
        //console.log(wrapperWidth);
    }

    render () {

        const {blockWidth, screenHeight, data, dataVisible} = this.state;






        console.log(data);
        const wrapperStyle = {
            position: 'relative',
            height: '808px',
            overflowX: 'scroll'

        };


        const buttonWrap = {
            position: 'relative'
        };


        let top = 0;
        let width = 200;
        let left = blockWidth/2 - width/2;
        let height = 50;
        let distanceY = 50;
        let distanceX = 150;
        //screenHeight
        console.log(dataVisible);
        if(dataVisible.length > 0){
            let empArray = '';

            dataVisible.forEach((emp, number) => {
                let countChildren = emp.childrenName.length;
                let length = countChildren * (width + distanceX);
                top = Number(top) + 50 + Number(distanceY);

                if(emp.parent === ''){
                    emp.top = top;
                    emp.left = left;
                }


                const totalChildrenWidth = (width + distanceX)*countChildren - distanceX;

                let currentLeft = 0;


                emp.childrenName.forEach((child, index) => {
                    dataVisible.forEach((employee) => {
                        if(employee.parentName === child.name){
                            employee.top = emp.top + height + distanceY;

                            if(index === 0){
                                employee.left = emp.left - totalChildrenWidth/2 + width/2;
                                if(employee.left < 0){
                                    employee.left = 50;
                                }
                                currentLeft = employee.left;
                            }
                            else{
                                employee.left = currentLeft + width + distanceX;
                                currentLeft = employee.left;
                            }
                        }
                    });





                })




                /*if (children === 1) {
                    left = left;
                } else {
                    left = left - width / 2 - distanceX / 2 - length/2;
                }
                for (let i = 0; i < children; i++) {
                    if (children === 1) {
                        left = left;
                    } else {
                        left = left + width + distanceX;
                    }
                    const test = emp.childrenName[i];
                    empArray = empArray + `<div style="position: absolute; z-index: 990; left: ` + left + `px; top: ` + top + `px; height: 50px; width: ` + width + `px; background-color: #CCCCCC">` + test.name + ` - ` + left + `</div>`;
                }*/
            })
            console.log(dataVisible);



                /*for (let key in companyData) {
                    if (companyData[key].parent === '') {
                        top = 50;
                        left = 500;
                    } else {
                        top = companyData[companyData[key].parent].top + height + distanceY;
                        left = companyData[companyData[key].parent].left;
                    }
                    companyData[key].top = top;
                    companyData[key].left = left;
                }

                let topList = [];
                for (let key in companyData) {
                    if (topList.indexOf(companyData[key].top) === -1){
                        topList.push(companyData[key].top);
                    }
                }

                for (let i = 0; i < topList.length; i++) {
                    for (let key in companyData) {
                        if (companyData[key].top === topList[i]) {
                            left = left + width + distanceX;
                            companyData[key].left = left;
                        }
                    }
                }


                for (let i = topList.length; i != -1; i--) {
                    for (let key in companyData) {
                        if (companyData[key].top === topList[i]) {
                            left = left + width + distanceX;
                            companyData[key].left = left;
                        }
                    }
                }

                for (let key in companyData) {
                    block = block + `<div style="position: absolute; z-index: 990; left: ` + companyData[key].left + `px; top: ` + companyData[key].top + `px; height: ` + height + `px; width: ` + width + `px; background-color: #CCCCCC">` + companyData[key].name + ` - ` + companyData[key].left + `</div>`;
                }

                console.log(companyData);
                console.log(structure);
                console.log(topList);*/
            empArray = dataVisible.map((item, index) => {

                let leftFirstChild = 0;

                if(item.childrenName.length > 0){
                    dataVisible.forEach((emp) => {

                        if(emp.parentName === item.childrenName[0].name){

                            leftFirstChild = item.left - emp.left;
                        }
                    })
                }







                const blockStyle = {
                    position: 'absolute',
                    zIndex: '990',
                    left: item.left,
                    top: item.top,
                    height: height,
                    width: width,
                    backgroundColor: '#CCCCCC'
                };
                let hrParent = {};
                let hrChild = {};
                let hrTotal = {};
                let buttonPlusStyle = {};
                let buttonMinusStyle = {};



                if(item.childrenName.length > 0){
                    hrParent = {
                        position: 'absolute',
                        left: '100px',
                        top: '50px',
                        zIndex: '990',
                        height: '25px',
                        width: '2px',
                        backgroundColor: '#CCCCCC'
                    };
                    hrTotal = {
                        position: 'absolute',
                        left: -leftFirstChild + width/2,
                        top: '75px',
                        zIndex: '990',
                        height: '2px',
                        width: item.childrenName.length*(width + distanceX) - width -distanceX,
                        backgroundColor: '#CCCCCC'
                    };

                    buttonPlusStyle = {
                        position: 'absolute',
                        left: '90px',
                        top: '36px',
                        borderRadius: '50%',
                        border: 'none',
                        zIndex: '991'
                    };
                    buttonMinusStyle = {
                        position: 'absolute',
                        left: '90px',
                        top: '36px',
                        borderRadius: '50%',
                        border: 'none',
                        zIndex: '991'
                    };
                }
                else{
                    hrParent = {
                        display: 'none'
                    };

                    hrTotal = {
                        display: 'none'
                    };
                    buttonPlusStyle = {
                        display: 'none'
                    };
                    buttonMinusStyle = {
                        display: 'none'
                    };
                }
                if(item.parent !== ''){
                    hrChild = {
                        position: 'absolute',
                        left: '100px',
                        top: '-25px',
                        zIndex: '990',
                        height: '25px',
                        width: '2px',
                        backgroundColor: '#CCCCCC'
                    };
                }
                else{
                    hrChild = {
                        display: 'none'
                    };
                }


                return <div  style={blockStyle}>
                    <div style={buttonWrap}>
                        {item.parentName}

                        <button onClick={(e) => this.notChildren(e, item.parentName)} style={buttonMinusStyle} >
                            -
                        </button>
                        <button onClick={(e) => this.getChildren(e, item.parentName)} style={buttonPlusStyle} >
                            +
                        </button>
                        <div style={hrParent}></div>
                        <div style={hrChild}></div>
                        <div style={hrTotal}></div>
                    </div>

                </div>
            })

             /*empArray =  <div  style={blockStyle}>
                    <div style={buttonWrap}>
                        sss
                        <button onClick={this.getChildren} style={buttonStyle} >
                            +
                        </button>+
                    </div>

                </div>*/

            return (


                <div className="row mg-t_50">
                    <div className="col-12"  style={wrapperStyle}>
                        {empArray}
                    </div>

                </div>
            )
        }
        else{
            return '';
        }

    }
}

//{ReactHtmlParser(this.companyTemplate())}
/*<div  style={blockStyle}>
    <div style={buttonWrap}>
        {data[Object.keys(data)[0]].parentName}
        <button onClick={this.getChildren} style={buttonStyle} >
            +
        </button>+
    </div>

</div>*/
export default Company;
