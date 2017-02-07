import re

def get_matching_words(regex):
    words = ["aimlessness", "assassin", "baby", "beekeeper", "belladonna", "cannonball", "crybaby", "denver", "embraceable", "facetious", "flashbulb", "gaslight", "hobgoblin", "iconoclast", "issue", "kebab", "kilo", "laundered", "mattress", "millennia", "natural", "obsessive", "paranoia", "queen", "rabble", "reabsorb", "sacrilegious", "schoolroom", "tabby", "tabloid", "unbearable", "union", "videotape"]

    return [word for word in words if re.search(regex, word)]

print get_matching_words(r"v")
print get_matching_words(r"s{2}")
print get_matching_words(r"e$")
print get_matching_words(r"b.b")
print get_matching_words(r"b[a-zA-Z]{1,}b")
print get_matching_words(r"b[a-zA-Z]{0,}b")
print get_matching_words(r"a[^iou]{0,}e[^aou]{0,}i[^aeu]{0,}o[^aei]{0,}u")
print get_matching_words(r"^[regulxpsion]{1,}$")
print get_matching_words(r"([a-z])\1")
