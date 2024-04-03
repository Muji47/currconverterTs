var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mySelectFrom = document.getElementById("curr_from");
var mySelectTo = document.getElementById("curr_to");
var mySelectToSec = document.getElementById("curr_to_sec");
var optionalSelect = document.getElementById("optional_dropdown");
var optional_amount = document.getElementById("optional_amount");
function fetchDataWithErrors() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, x, opt, x, opt, x, opt, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('https://openexchangerates.org/api/latest.json?app_id=cd24bc83a444456e9966b810fc9ce7ca')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Request failed with status ' + response.status + " Please check your link from where you are trying to fetch some data");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    for (x in data.rates) {
                        opt = document.createElement('option');
                        opt.value = data.rates[x];
                        opt.innerHTML = x;
                        mySelectFrom.appendChild(opt);
                    }
                    for (x in data.rates) {
                        opt = document.createElement('option');
                        opt.value = data.rates[x];
                        opt.innerHTML = x;
                        mySelectTo.appendChild(opt);
                    }
                    for (x in data.rates) {
                        opt = document.createElement('option');
                        opt.value = data.rates[x];
                        opt.innerHTML = x;
                        mySelectToSec.appendChild(opt);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    document.getElementById("body").innerText = error_1.message;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var no_Conversion = document.querySelectorAll("input[name='select_conver']");
var selected_one;
no_Conversion.forEach(function (selected) { return selected.addEventListener("change", function () {
    selected_one = document.querySelector("input[name='select_conver']:checked");
    if (selected_one.value === "multiple") {
        optionalSelect.style.display = "block";
    }
    else {
        optionalSelect.style.display = "none";
        optional_amount.style.display = "none";
    }
}); });
var from, to, more;
var handleChangeAmount = function () {
    var currAmount = document.getElementById("amountcon");
    var amount = document.getElementById("aamount");
    var validateText = document.getElementById("validateText");
    if (!currAmount.value || !mySelectFrom.value || !mySelectTo.value) {
        validateText.style.display = "block";
        setTimeout(function () { return validateText.style.display = "none"; }, 2000);
    }
    else if (mySelectFrom.value === mySelectTo.value || mySelectFrom.value === mySelectToSec.value || mySelectTo.value === mySelectToSec.value) {
        validateText.style.display = "block";
        validateText.innerText = "converting currency cannot be same";
        setTimeout(function () { return validateText.style.display = "none"; }, 2000);
    }
    else {
        Object.values(mySelectFrom.options).forEach(function (option) {
            if (option.value === mySelectFrom.value)
                from = option.text;
        });
        Object.values(mySelectTo.options).forEach(function (option) {
            if (option.value === mySelectTo.value)
                to = option.text;
        });
        Object.values(mySelectToSec.options).forEach(function (option) {
            if (option.value === mySelectToSec.value)
                more = option.text;
        });
        amount.innerText = from + " to " + to + " " + (parseFloat(currAmount.value) * parseFloat(mySelectTo.value)) / parseFloat(mySelectFrom.value);
        if (selected_one.value === "multiple") {
            optional_amount.style.display = "block";
            optional_amount.innerText = from + " to " + more + " " + (parseFloat(currAmount.value) * parseFloat(mySelectToSec.value)) / parseFloat(mySelectFrom.value);
        }
        currAmount.innerText = "";
    }
};
fetchDataWithErrors();
