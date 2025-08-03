class ServerBartender {
    constructor(name, ampm, startTime, endTime, cashTips, cardTips, grossSales, salesTax, type) {
        this.name = null;
        let now = new Date();
        let hour = now.getHours();
        this.AmPm = hour < 12 ? 'am' : 'pm';
        this.S_Time = null;
        this.E_Time = null;
        this.totalHours = 0;
        this.cashTips = 0;
        this.cardTips = 0;
        this.totalTips = 0;
        this.grossSales = 0;
        this.salestax = 0;
        this.netSales = 0;
        this.cashtipOut = 0;
        this.cardtipOut = 0;
        this.totalTipOut = 0;
        this.type = null;
        this.setAll(name, ampm, startTime, endTime, cashTips, cardTips, grossSales, salesTax, type);
    }
    setAll(name, ampm, startTime, endTime, cashTips, cardTips, grossSales, salesTax, type) {
        this.setName(name);
        this.setAmPm(ampm);

        this.setStartTime(startTime);
        this.setEndTime(endTime);

        this.setCashTips(cashTips);
        this.setCardTips(cardTips);
        this.totalTips = this.cashTips + this.cardTips;

        this.setGrossSales(grossSales);
        this.setSalesTax(salesTax);
        // Calculate net sales
        this.netSales = this.grossSales - this.salestax - this.cardTips;
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
    setCashTips(tips) {
        this.cashTips = Math.round(parseFloat(tips) * 100) / 100;
    }
    setCardTips(tips) {
        this.cardTips = Math.round(parseFloat(tips) * 100) / 100;
    }
    setGrossSales(sales) {
        this.grossSales = Math.round(parseFloat(sales) * 100) / 100;
    }
    setSalesTax(salesTax) {
        this.salestax = Math.round(parseFloat(salesTax) * 100) / 100;
    }
    setCashtipOut(tips) {
        this.cashtipOut = Math.round(parseFloat(tips) * 100) / 100;
    }
    setCardtipOut(tips) {
        this.cardtipOut = Math.round(parseFloat(tips) * 100) / 100;
    }
    setNetSales(netSales) {
        this.netSales = Math.round(parseFloat(netSales) * 100) / 100;
    }
    setType(type) {
        this.type = type;
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
        const start = new Date(`1970-01-01T${this.S_Time}:00`);
        const end = new Date(`1970-01-01T${this.E_Time}:00`);
        let hours = (end - start) / (1000 * 60 * 60);
        if (hours < 0) hours += 24;
        this.totalHours = Math.round(hours * 100) / 100;
        return this.totalHours;
    }
    getCashTips() {
        return Math.round(this.cashTips * 100) / 100;
    }
    getCardTips() {
        return Math.round(this.cardTips * 100) / 100;
    }
    getTotalTips() {
        return Math.round((this.cashTips + this.cardTips) * 100) / 100;
    }
    getGrossSales() {
        return Math.round(this.grossSales * 100) / 100;
    }
    getSalesTax() {
        return Math.round(this.salestax * 100) / 100;
    }
    getNetSales() {
        return Math.round(this.netSales * 100) / 100;
    }
    getCashtipOut() {
        return Math.round(this.cashtipOut * 100) / 100;
    }
    getCardtipOut() {
        return Math.round(this.cardtipOut * 100) / 100;
    }
    getTotalTipOut() {
        return Math.round((this.cashtipOut + this.cardtipOut) * 100) / 100;
    }
    getType() {
        return this.type;
    }

    getBBCashTips(tipPercent) {
        let totalTips = this.getNetSales() * tipPercent;
        totalTips = Math.round(totalTips * 100) / 100;
        let cashTips = Math.floor(totalTips / 2) + 1;
        return cashTips;
    }
    getBBCardTips(tipPercent) {
        let totalTips = this.getNetSales() * tipPercent;
        totalTips = Math.round(totalTips * 100) / 100;
        let cardTips = totalTips - (Math.floor(totalTips / 2) + 1);
        return cardTips;
    }
    getHostCashTips(tipPercent) {
        let totalTips = this.getNetSales() * tipPercent;
        totalTips = Math.round(totalTips);
        return totalTips;
    }
}
