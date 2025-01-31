export const formatINR = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  

  export const numberToWords = (num: number): string => {
    if (num === 0) return "Zero Rupees";
  
    const belowTwenty = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
    const units = ["", "Thousand", "Lakh", "Crore"];
  
    const convertBelowThousand = (n: number): string => {
      if (n < 20) return belowTwenty[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + belowTwenty[n % 10] : "");
      return belowTwenty[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + convertBelowThousand(n % 100) : "");
    };
  
    let word = "";
    let unitIndex = 0;
  
    while (num > 0) {
      let part = num % 1000;
      if (part !== 0) {
        word = convertBelowThousand(part) + " " + units[unitIndex] + (word ? " " + word : "");
      }
      num = Math.floor(num / (unitIndex === 0 ? 1000 : 100));
      unitIndex++;
    }
  
    return word.trim() + " Rupees";
  };
  