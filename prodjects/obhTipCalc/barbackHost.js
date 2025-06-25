class BarbackHost {
    constructor(name, ampm, startTime, endTime, type) {
        this.name = null;
        let now = new Date();
        let hour = now.getHours();
        this.AmPm = hour < 12 ? 'am' : 'pm';
        this.S_Time = null;
        this.E_Time = null;
        this.totalHours = 0;
        this.type = 0; // 'barback' or 'host'
        this.cashtipOut = 0;
        this.cardtipOut = 0;
        this.totalTipOut = 0;

        this.setAll(name, ampm, startTime, endTime, type);
    }
    setAll(name, ampm, startTime, endTime, type) {
        this.setName(name);
        this.setAmPm(ampm);

        this.setStartTime(startTime);
        this.setEndTime(endTime);
        const start = new Date(`1970-01-01T${this.S_Time}:00`);
        const end = new Date(`1970-01-01T${this.E_Time}:00`);
        let hours = (end - start) / (1000 * 60 * 60);
        if (hours < 0) hours += 24;
        this.totalHours = hours;
        this.setType(type);

    }
    setName(name) {
        this.name = name;
    }
    setAmPm(ampm) {
        this.AmPm = ampm;
    }
    setStartTime(time) {
        this.S_Time = time;
    }
    setEndTime(time) {
        this.E_Time = time;
    }
    setType(type) {
        this.type = type; // 'barback' or 'host'
    }
    setCashtipOut(tips) {
        this.cashtipOut = parseFloat(tips);
    }
    setCardtipOut(tips) {
        this.cardtipOut = parseFloat(tips);
    }
    setTotalTipOut(total) {
        this.totalTipOut = parseFloat(total);
    }



    getName() {
        return this.name;
    }
    getAmPm() {
        return this.AmPm;
    }
    getStartTime() {
        return this.S_Time;
    }
    getEndTime() {
        return this.E_Time;
    }
    getTotalHours() {
        return this.totalHours;
    }
    getType() {
        return this.type; // 'barback' or 'host'
    }
    getCashtipOut() {
        return parseFloat(this.cashtipOut);
    }
    getCardtipOut() {
        return parseFloat(this.cardtipOut);
    }
    getTotalTipOut() {
        return this.getCardtipOut() + this.getCashtipOut();
    }






}