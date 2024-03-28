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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var button = document.getElementById("generate");
var author = document.getElementById("author");
var text = document.getElementById("text");
var Data = /** @class */ (function () {
    function Data(text, author) {
        this.text = text;
        this.author = author;
    }
    return Data;
}());
var QuoteFetcher = /** @class */ (function () {
    function QuoteFetcher() {
    }
    QuoteFetcher.fetchRandomQuote = function () {
        return __awaiter(this, void 0, Promise, function () {
            var API, response, convert, quote, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        API = "https:/api.quotable.io/random";
                        return [4 /*yield*/, fetch(API, { method: "GET" })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        convert = _a.sent();
                        if (!response.ok) {
                            throw new Error("failed to fetch");
                        }
                        quote = new Data(convert.content, convert.author);
                        return [2 /*return*/, quote];
                    case 3:
                        err_1 = _a.sent();
                        text.textContent = err_1;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return QuoteFetcher;
}());
var Translate = /** @class */ (function () {
    function Translate() {
    }
    Translate.getTranslateText = function (inputText) {
        return __awaiter(this, void 0, Promise, function () {
            var API, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        API = "https://api.mymemory.translated.net/get?q=".concat(encodeURIComponent(inputText), "&langpair=en|id");
                        return [4 /*yield*/, fetch(API, { method: "GET" })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.responseData.translatedText];
                }
            });
        });
    };
    return Translate;
}());
function displayQuote() {
    return __awaiter(this, void 0, void 0, function () {
        var quote, translateText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, QuoteFetcher.fetchRandomQuote()];
                case 1:
                    quote = _a.sent();
                    return [4 /*yield*/, Translate.getTranslateText(quote.text)];
                case 2:
                    translateText = _a.sent();
                    try {
                        text.textContent = translateText;
                        author.textContent = "Pembuat: " + quote.author;
                    }
                    catch (err) {
                        console.error(err);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
button.addEventListener("click", function () { return displayQuote(); });
document.addEventListener("DOMContentLoaded", displayQuote);
var MusicPlayer = /** @class */ (function () {
    function MusicPlayer(sources, progressBar, durationElement, currentTimeElement) {
        this.currentSrcIndex = -1;
        this.sources = [];
        this.isPaused = false;
        this.resumeTime = 0;
        this.audio = new Audio();
        this.sources = sources;
        this.progressBar = progressBar;
        this.durationElement = durationElement;
        this.currentTimeElement = currentTimeElement;
        this.audio.addEventListener("ended", this.onMusicEnded());
    }
    MusicPlayer.prototype.playMusic = function () {
        var source = this.sources[this.currentSrcIndex];
        this.audio.src = source;
        if (this.isPaused) {
            if (!isNaN(this.resumeTime)) {
                this.audio.currentTime = this.resumeTime;
            }
            this.audio.play();
        }
        this.audio.play();
        this.isPaused = false;
    };
    MusicPlayer.prototype.next = function () {
        this.currentSrcIndex = (this.currentSrcIndex + 1) % this.sources.length;
        this.playMusic();
    };
    MusicPlayer.prototype.previous = function () {
        this.currentSrcIndex = (this.currentSrcIndex - 1 + this.sources.length) % this.sources.length;
        this.playMusic();
    };
    MusicPlayer.prototype.pauseMusic = function () {
        this.isPaused = true;
        this.resumeTime = this.audio.currentTime;
        this.audio.pause();
    };
    MusicPlayer.prototype.onMusicEnded = function () {
        this.next();
    };
    MusicPlayer.prototype.updateProgressBar = function () {
        var percentage = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressBar.style.width = percentage + 'px';
        var format = function (time) { return String(Math.floor(time)).padStart(2, '0'); };
        durationElement.textContent = "".concat(format(this.audio.duration / 60), ":").concat(format(this.audio.duration % 60));
        currentTimeElement.textContent = "".concat(format(this.audio.currentTime / 60), ":").concat(format(this.audio.currentTime % 60));
    };
    return MusicPlayer;
}());
var Button = /** @class */ (function () {
    function Button(id) {
        var _this = this;
        this.id = id;
        this.eventHandlers = {};
        var button = document.getElementById(id);
        if (button) {
            button.addEventListener("click", function () { return _this.onClick(); });
        }
        else {
            throw new Error("button not found");
        }
    }
    Button.prototype.onClick = function () {
        if (this.eventHandlers["click"]) {
            this.eventHandlers["click"]();
        }
    };
    Button.prototype.onClickEvent = function (handler) {
        this.eventHandlers["click"] = handler;
    };
    return Button;
}());
var sources = ["gak-pake-lama.mp3", "Janji-setia.mp3", "separuh-aku-noah.mp3", "who-iam-alan-walker.mp3"];
var progress = document.getElementById("progress");
var durationElement = document.getElementById("duration");
var currentTimeElement = document.getElementById("currentTime");
var musicPlayer = new MusicPlayer(sources, progress, durationElement, currentTimeElement);
var playButton = new Button("play");
var pauseButton = new Button("pause");
var nextButton = new Button("next");
var prevButton = new Button("previous");
playButton.onClickEvent(function () {
    musicPlayer.playMusic();
    setInterval(function () {
        musicPlayer.updateProgressBar();
    }, 100);
});
pauseButton.onClickEvent(function () {
    musicPlayer.pauseMusic();
});
nextButton.onClickEvent(function () {
    musicPlayer.next();
});
prevButton.onClickEvent(function () {
    musicPlayer.previous();
});
var DynamicBackgroundCard = /** @class */ (function () {
    function DynamicBackgroundCard() {
        var _this = this;
        this.parentCard = document.getElementById('parentCard');
        this.textElement = document.getElementById('text');
        this.generateButton = document.getElementById('generate');
        this.authorElement = document.getElementById("author");
        this.titleElement = document.querySelector(".title");
        this.generateButton.addEventListener('click', function () { return _this.changeBackgroundColor(); });
    }
    DynamicBackgroundCard.prototype.getRandomColor = function () {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };
    DynamicBackgroundCard.prototype.isDarkColor = function (color) {
        var hexColor = color.replace('#', '');
        var r = parseInt(hexColor.substr(0, 2), 16);
        var g = parseInt(hexColor.substr(2, 2), 16);
        var b = parseInt(hexColor.substr(4, 2), 16);
        var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
    };
    DynamicBackgroundCard.prototype.changeBackgroundColor = function () {
        var randomColor = this.getRandomColor();
        this.parentCard.style.backgroundColor = randomColor;
        var textColor = this.isDarkColor(randomColor) ? '#fff' : '#000';
        var authorColor = this.isDarkColor(randomColor) ? "#ccc" : "#555";
        var titleColor = this.isDarkColor(randomColor) ? "#fff" : "#000";
        this.textElement.style.color = textColor;
        this.authorElement.style.color = authorColor;
        this.titleElement.style.color = titleColor;
    };
    return DynamicBackgroundCard;
}());
var dynamicBackgroundCard = new DynamicBackgroundCard();
dynamicBackgroundCard.changeBackgroundColor();
