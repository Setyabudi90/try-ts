const text: HTMLElement = document.getElementById("text");
const author: HTMLElement = document.getElementById("author");
const button: HTMLElement = document.getElementById("generate");

class Data {
  text: string;
  author: string;
  constructor(text: string, author: string){
    this.text = text;
    this.author = author;
  }
}

class QuoteFetcher {
  static async RandomQuote(): Promise<Data> {
    const API = "https://api.quotable.io/random";
    try {
      const response = await fetch(API, {method: "GET"});
      const convert = await response.json();
      const quote: Data = new Data(convert.content, convert.author);
      return quote;
    } catch(e){
      throw new Error(e);
    }
  }
}

class Translate {
  static async getTranslateText(text: string): Promise {
    const API = `https://api.mymemory.translated.net/get?q=${ encodeURIComponent(text)}&langpair=en|id`;
    try {
      const response = await fetch(API, {method: "GET"});
      const convert = await response.json();
      return convert.responseData.translatedText;
    } catch(e){
      throw new Error(e);
    }
  }
}

async function displayQuote(){
  const quote: Data = await QuoteFetcher.RandomQuote();
  const translateText = Translate.getTranslateText(quote.text);
  try {
    text.textContent = translateText;
    author.textContent = "Pembuat: " + quote.author;
  } catch(e){
    throw new Error(e);
  }
}

button.addEventListener("click", () => displayQuote());
document.addEventListener("DOMContentLoaded", displayQuote);

class MusicPlayer {
  private sources: string[] = [];
  private currentSrcIndex: number = 0;
  private resumeTime: number = 0;
  private audio: HTMLAudioElement = new Audio();
  private isPaused: boolean = false;
  private progressBar: HTMLElement;
  private durationElement: HTMLElement;
  private currentTimeElement: HTMLElement;
  constructor(
    sources: string[],
    progressBar: HTMLElement,
    durationElement: HTMLElement,
    currentTimeElement: HTMLElement
    ) {
        this.sources = sources;
        this.progressBar = progressBar;
        this.durationElement = durationElement;
        this.currentTimeElement = currentTimeElement;
        this.audio.addEventListener("ended", () => this.onMusicEnded());
    }
    
    public playMusic(): void {
      const source = this.sources[this.currentSrcIndex];
      this.audio.src = source;
      if(this.isPaused){
        if(!isNaN(this.resumeTime)){
          this.audio.currentTime = this.resumeTime;
        }
      }
      this.audio.play();
      this.isPaused = false;
    }
    
    public next(): void {
      this.currentSrcIndex = (this.currentSrcIndex + 1) % this.sources.length;
      this.playMusic();
    }
    
    public pauseMusic(): void {
      this.isPaused = true;
      this.resumeTime = this.audio.currentTime;
      this.audio.pause();
    }
    
    public onMusicEnded(): void {
      this.next();
    }
    
    public previous(): void {
      this.currentSrcIndex = (this.currentSrcIndex - 1 + this.sources.length) % this.sources.length;
      this.playMusic();
    }
    
    public updateProgressBar(): void {
        const percentage: number = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressBar.style.width = percentage + '%';
        const format = (time: number) => String(Math.floor(time)).padStart(2, '0');
        this.durationElement.textContent = `${format(this.audio.duration / 60)}:${format(this.audio.duration % 60)}`;
        this.currentTimeElement.textContent = `${format(this.audio.currentTime / 60)}:${format(this.audio.currentTime % 60)}`;
    }
}

class Button {
  private eventHandlers: { [key: string]: Function } = {};
  constructor(private id: string){
    const button: HTMLElement = document.getElementById(id);
    if(button){
      button.addEventListener("click", () => this.onClick());
    } else {
      throw new Error("button not found")
    }
  }
  
  private onClick(): void {
        if (this.eventHandlers["click"]) {
            this.eventHandlers["click"]();
        }
    }

  public onClickEvent(handler: () => void): void {
        this.eventHandlers["click"] = handler;
    }
}

const sources: string[] = [
  "audio/gak-pake-lama.mp3", 
  "audio/Janji-setia.mp3", 
  "audio/separuh-aku-noah.mp3", 
  "audio/who-iam-alan-walker.mp3"
  ];
const progress: HTMLElement = document.getElementById("progress")!;
const durationElement: HTMLElement = document.getElementById("duration");
const currentTimeElement: HTMLElement = document.getElementById("currentTime");
const musicPlayer = new MusicPlayer(sources, progress, durationElement, currentTimeElement);

const playButton = new Button("play");
const pauseButton = new Button("pause");
const nextButton = new Button("next");
const prevButton = new Button("previous");

playButton.onClickEvent(() => {
    musicPlayer.playMusic();
    setInterval(() => {
        musicPlayer.updateProgressBar();
    }, 100);
});

pauseButton.onClickEvent(() => {
    musicPlayer.pauseMusic();
});

nextButton.onClickEvent(() => {
    musicPlayer.next();
});

prevButton.onClickEvent(() => {
    musicPlayer.previous();
});

class DynamicBackgroundCard {
    private parentCard: HTMLElement;
    private textElement: HTMLElement;
    private generateButton: HTMLElement;
    private authorElement: HTMLElement;
    private titleElement: HTMLElement;

    constructor() {
        this.parentCard = document.getElementById('parentCard')!;
        this.textElement = document.getElementById('text')!;
        this.generateButton = document.getElementById('generate')!;
        this.authorElement = document.getElementById("author")!;
        this.titleElement = document.querySelector(".title")!;
        this.generateButton.addEventListener('click', () => this.changeBackgroundColor());
    }

    private getRandomColor(): string {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    private isDarkColor(color: string): boolean {
        const hexColor = color.replace('#', '');
        const r = parseInt(hexColor.substr(0, 2), 16);
        const g = parseInt(hexColor.substr(2, 2), 16);
        const b = parseInt(hexColor.substr(4, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
    }

    public changeBackgroundColor(): void {
        const randomColor = this.getRandomColor();
        this.parentCard.style.backgroundColor = randomColor;
        const textColor = this.isDarkColor(randomColor) ? '#fff' : '#000';
        const authorColor = this.isDarkColor(randomColor) ? "#ccc" : "#555";
        const titleColor = this.isDarkColor(randomColor) ? "#fff" : "#000";
        this.textElement.style.color = textColor;
        this.authorElement.style.color = authorColor;
        this.titleElement.style.color = titleColor;
    }
}

const dynamicBackgroundCard = new DynamicBackgroundCard();
dynamicBackgroundCard.changeBackgroundColor();



