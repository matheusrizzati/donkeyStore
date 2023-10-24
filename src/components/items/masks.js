const maskCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
};

const maskMoney = (value, separator = ',') => {
    var getDigitsFromValue = function(value) {
        return value.replace(/(-(?!\d))|[^0-9|-]/g, '') || '';
    };

    var padDigits = function(digits) {
        var desiredLength = 3;
        var actualLength = digits.length;

        if (actualLength >= desiredLength) {
            return digits;
        }

        var amountToAdd = desiredLength - actualLength;
        var padding = '0'.repeat(amountToAdd);
        return padding + digits;
    };

    var removeLeadingZeros = function(number) {
        return number.replace(/^0+([0-9]+)/, '$1');
    };

    var addDecimalToNumber = function(number, separator) {
        var centsStartingPosition = number.length - 2;
        var dollars = removeLeadingZeros(number.substring(0, centsStartingPosition));
        var cents = number.substring(centsStartingPosition);
        return dollars + separator + cents;
    };

    var digits = getDigitsFromValue(value);
    var digitsWithPadding = padDigits(digits);
    var formattedValue = addDecimalToNumber(digitsWithPadding, separator);

    // Adiciona o símbolo da moeda e o ponto de milhar
    return `R$ ${formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

module.exports = { maskCPF, maskMoney }