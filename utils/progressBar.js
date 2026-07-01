module.exports = (current, total, size = 20) => {

    if (!total || total <= 0) {
        return "◉━━━━━━━━━━━━━━━━━━";
    }

    const percentage = current / total;

    const position = Math.min(
        size - 1,
        Math.floor(percentage * size)
    );

    let bar = "";

    for (let i = 0; i < size; i++) {

        if (i === position) {

            bar += "◉";

        } else {

            bar += "━";

        }

    }

    return bar;

};