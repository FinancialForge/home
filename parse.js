function getTotal(ocr_rec) {
    let words = (ocr_rec.toLowerCase()+' ENDTXT').replaceAll(':', '').replaceAll('$', '').split(' ') // list of words in receipt (ENDTXT is so that last ends item is compiled)
    let indecies = []; // list of occurences of "total"
    let ends = []; // list of ends of searces for number after "total"
    let iDict = []; // list of start-end coordinates
    let ttlFound = false; // bool for if the total has been found and no end was added
    let lastwasnum = false; // bool for if the last word was a number
    words.forEach((word, i) => {
        // if the total was found previously:
        if (ttlFound) {
            let numfound = false; // does this word contain numbers?
            '1234567890.'.split('').forEach(num => {
                word.split('').forEach(char => {
                    // if the character is a number, a number was found
                    if (char == num) {
                        numfound = true
                        lastwasnum = true
                    }
                })
            })
            //if this is not a number and the last word was, add the index to ends and reset end-finding variables
            if (!numfound & lastwasnum) {
                ends.push(i);
                ttlFound = false
                lastwasnum = false
            }
        }
        // if total is found add it to indecies and notify end-finding script
        if (word == 'total') indecies.push(i);
        if (word == 'total') ttlFound = true;
    });
    if (indecies.length === ends.length) {
        // if indeceies and ends match, update list of start-end coordinates
        indecies.forEach((_, i) => {
            iDict.push([indecies[i], ends[i]])
        })
    } else {
        // otherwize, return null
        return null
    } 
    let sets = [] // set of start-end coordinates
    iDict.forEach((set) => {
        sets.push(JSON.parse(JSON.stringify(words)).splice(set[0], (set[1]-set[0]))) // calculates start and end
    })
    let nums = [] // possibilities of the total
    sets.forEach(set => {
        set.forEach(part => {
            if (Number(part)) nums.push(Number(part)) // find each possibility of the total
        })
    })
    // if no possibilities return null
    if (nums.length === 0) return null
    // get frequencies of possibilities
    const frequency = {};
    nums.forEach(num => {
        frequency[num] = (frequency[num] || 0) +1 // add each possibility to frequency list
    })
    const m_freq =  Math.max(...Object.values(frequency)); // get the highest frequency
    const modes = Object.keys(frequency).filter(num => frequency[num] === m_freq); // get the keys of the inversed frequencies
    // return the highest frequency, hence the most probable total
    return Number(modes[0]);
}

function getDate(_ocr_rec) {
    return "DATE"
}

console.log(getTotal('Total 44.44'))