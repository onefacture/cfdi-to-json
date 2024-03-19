export function overrideStringProto() {

    String.prototype.hashCode = function() {
        let hash = 0;
        if (this.length === 0) return hash;

        for (let i = 0; i < this.length; i++) {
            let character  = this.charCodeAt(i);
            hash           = ((hash << 5) - hash) + character;
            hash           = hash & hash; // Convert to 32bit integer
        }

        return hash.toString();
    }

}

export function overrideArrayProto() {

    Array.prototype.excludeAttributes = function(inputArray: Array<String>) {
        if(!inputArray || !inputArray.length) {
            return this;
        }

        return this.filter((item: String) => inputArray.indexOf(item) < 0);
    };

}

export function initOverrides() {
    overrideStringProto();
    overrideArrayProto();
}
