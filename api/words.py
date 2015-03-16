import json
import copy
import random

with open("../turk_experiment_blocks.json", "r") as f:
    BLOCKS = json.load(f)["words"]

def get_word_blocks():
    blocks = copy.deepcopy(BLOCKS)
    for block_name in blocks:
        random.shuffle(blocks[block_name])
    return blocks
