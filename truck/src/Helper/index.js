export const userDriver = {
    name_$I_MINCHAR6_MAXCHAR100: '',
    last_name: '',
    email_$M_I: '',
    password: '',
    ADR_class: '',
    upload_documents_$P_I: [],
    truck_plate_number: '',
    vehicle_model: '',
    euro_class: '',
    HPK_horse_power: '',
    engine: '',
    max_weight: 0,
};
export const userDriverLogIn = {
    name_$I_MINCHAR6_MAXCHAR100: '',
    password: '',
};
export const userClient = {
    name_$I: '',
    last_name_$I: '',
    email_$I: '',
    password_$I: '',
    confirm_password_$I: '',
};
export const userClientLogIn = {
    phone_$I: '',
    password_$I: ''
};

export const clientShipping = {
    commodity_type_$I: '',
    commodity_name_$I: '',
    HC_CODE_$I: '',
    dangerous_cargo_$I: '',
    IMO_class_$I: '',
    UN_number_$I: '',
    address_loading_$I: '',
    address_unloading_$I: '',
    date_$I: '',
}

// export const clientShipping = {
//     commodity_type_$I: '',
//     commodity_name_$I: '',
//     HC_CODE_$I: '',
//     dangerous_cargo_$I: '',
//     IMO_class_$I: '',
//     UN_number_$I: '',
//     address_loading_$I: '',
//     address_unloading_$I: '',
//     date_$I: '',
//     status_$H: ''
// }


/**
 *  In All JSon's objects we use special symbols, after "$"
 *  Dictionary:
 *  I - important*
 *  P - photo array input btn
 *  V - video array input btn
 *  H - hide field
 *
 *
 */
export function generateNormalName(data) {

    // Change name - replace "_"
    let arr = [];
    let newArr = [];
    let optionsValue = [];
    let changedData = data.replaceAll('_', ' ');
    if (!changedData) return [];
    // First letter to UpperCase
    // changedData = changedData[0].toUpperCase() + changedData.slice(1);
    // Divide array to chars and get all options key
    arr = changedData.split('');
    let number$ = changedData.indexOf('$');
    let opt = [];

    for (let i = 0; i < arr.length; i++) {
        if (number$ < 0) {
            return {
                key: arr.join(''),
                type: []
            }
        }
        if (i < number$) {
            //delete space in the end of key
            if (i !== number$ - 1) {
                newArr.push(arr[i])
            }
        }
        if (i > number$) {
            if (arr[i] === " ") {
                optionsValue.push(opt.join(''));
                opt = []
            } else if (i === arr.length - 1) {
                opt.push(arr[i]);
                optionsValue.push(opt.join(''));
                opt = []
            } else {
                opt.push(arr[i])
            }
        }
    }
    return {
        key: newArr.join(''),
        type: optionsValue
    }
}
export function checkProblem(forms) {
    let problems = [];
    let repeatPasswordArr = []
    Object.entries(forms).map((el) => {
        const string = el[1].value
        el[1].options.forEach((o) => {

            if (o === "I" && string === "") {
                problems.push({el: el[1], msg: "Please fill in this field"})
            } else if (o === 'P' && typeof string !== "string") {
                problems.push({el: el[1], msg: "photo array"})
            } else if (o === 'R' && typeof string === "string") {
                //check password repeat
                if (repeatPasswordArr.length === 0 && string) {
                    repeatPasswordArr.push(string)
                } else {
                    repeatPasswordArr.push(string)

                    if (repeatPasswordArr[0] === repeatPasswordArr[1]) {
                        return
                    }
                    if (repeatPasswordArr[0] !== repeatPasswordArr[1]) {
                        problems.push({el: el[1], msg: "password not match"})
                    }
                }
            } else if (o.includes('PW') && typeof string === "string") {
                console.log('PW', string, o)
                const checkedData = o.replace('PW', '').split('')
                let counter = 0
                checkedData.map((el, indx) => {
                    //uppercase case
                    if (el === 'u' && typeof +checkedData[indx + 1] === 'number') {
                        let number = checkedData[indx + 1]

                        string.split('').map(character => {
                            console.log('chars', character)

                            if (character == character.toUpperCase()) {
                                counter = counter + 1
                            }
                        })
                        if (!counter) {
                            // console.log('sdfslkfj', counter)
                            problems.push({el: el[1], msg: "need capital letter in your password"})
                        }

                    }
                })

            }

        })
    });
    return problems;
}
export function setDataToFirebase(forms) {
    let result = {}
    forms.map(el => {
            result = {...result, [el.keyText]: el.value}
        }
     )
    return result
}
