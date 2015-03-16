import os

def get_instructions():
    ret = []
    instruction_files = sorted(os.listdir("../instructions"))
    instruction_files = filter(lambda x: x.endswith(".txt"), instruction_files)
    for fname in instruction_files:
        path = "../instructions/" + fname
        with open(path, "r") as f:
            ret.append(f.read())
    return ret
