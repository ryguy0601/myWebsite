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
        this.cashTips = parseFloat(parseFloat(tips).toFixed(2));
    }
    setCardTips(tips) {
        this.cardTips = parseFloat(parseFloat(tips).toFixed(2));
    }
    setGrossSales(sales) {
        this.grossSales = parseFloat(parseFloat(sales).toFixed(2));
    }
    setSalesTax(salesTax) {
        this.salestax = parseFloat(parseFloat(salesTax).toFixed(2));
    }
    setCashtipOut(tips) {
        this.cashtipOut = parseFloat(parseFloat(tips).toFixed(2));
    }
    setCardtipOut(tips) {
        this.cardtipOut = parseFloat(parseFloat(tips).toFixed(2));
    }
    setNetSales(netSales) {
        this.netSales = parseFloat(parseFloat(netSales).toFixed(2));
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
        this.totalHours = parseFloat(hours);
        return this.totalHours;
    }
    getCashTips() {
        return parseFloat(this.cashTips.toFixed(2));
    }
    getCardTips() {
        return parseFloat(this.cardTips.toFixed(2));
    }
    getTotalTips() {
        return parseFloat((this.cashTips + this.cardTips).toFixed(2));
    }
    getGrossSales() {
        return parseFloat(this.grossSales.toFixed(2));
    }
    getSalesTax() {
        return parseFloat(this.salestax.toFixed(2));
    }
    getNetSales() {
        this.netSales = parseFloat(this.netSales.toFixed(2));
        return this.netSales;
    }
    getCashtipOut() {
        return parseFloat(this.cashtipOut.toFixed(2));
    }
    getCardtipOut() {
        return parseFloat(this.cardtipOut.toFixed(2));
    }
    getTotalTipOut() {
        return parseFloat((this.cashtipOut + this.cardtipOut).toFixed(2));
    }
    getType() {
        return this.type;
    }

    getBarbackCashTips(tipPercent) {
        let barbackTips = this.getNetSales() * tipPercent;
        let barbackCashTips = Math.floor(barbackTips/2);
        this.setCashtipOut(this.getCashtipOut() - barbackCashTips);
        console.log(`${this.getName()} has to pay the barback $${barbackCashTips}`);
        return barbackCashTips;
    }
    getBarbackCardTips(tipPercent) {
        let barbackTips = +(this.getNetSales() * tipPercent).toFixed(2);
        let barbackCardTips = +(barbackTips - this.getBarbackCashTips(tipPercent)).toFixed(2);
        this.setCardtipOut(this.getCardtipOut() - barbackCardTips);
        console.log(`${this.getName()} has to pay the barback $${barbackCardTips} in card tips`);
        return barbackCardTips;
    }

    getHostTips(tipPercent) {
        let hostTips = +(this.getNetSales() * tipPercent).toFixed(0);
        this.setCashtipOut(this.getCashtipOut() - hostTips);
        return hostTips;
    }





}