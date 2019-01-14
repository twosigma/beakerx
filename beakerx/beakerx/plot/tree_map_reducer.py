# Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import copy


class TreeMapReducer:

    @staticmethod
    def limit_tree_map(limit, root):
        tree_layers = TreeMapReducer.create_tree_layers(root)
        mapper = TreeMapReducer.reduce_tree_map_children(limit, tree_layers)
        return mapper[root]

    @staticmethod
    def create_tree_layers(root):
        tree_layers = []
        tree_layer = TreeLayer()
        tree_layer.add_node_layer(NodeLayer(root, root.children))
        tree_layers.append(tree_layer)
        TreeMapReducer.create_next_tree_layer(tree_layer, tree_layers)
        return tree_layers

    @staticmethod
    def create_next_tree_layer(tree_layer, tree_layers):
        new_tree_layer = TreeMapReducer.create_tree_layer(tree_layer.get_node_layers())
        if len(new_tree_layer.get_node_layers()) != 0:
            tree_layers.append(new_tree_layer)
            TreeMapReducer.create_next_tree_layer(new_tree_layer, tree_layers)

    @staticmethod
    def create_tree_layer(node_layers):
        new_tree_layer = TreeLayer()
        for nl in node_layers:
            children = nl.children
            if children is not None:
                for child in children:
                    node_layer = NodeLayer(child, child.children)
                    new_tree_layer.add_node_layer(node_layer)
        return new_tree_layer

    @staticmethod
    def reduce_tree_map_children(limit, tree_layers):
        mapper = {}
        tree_counter = TreeCounter()
        for tl in tree_layers:
            number_of_nodes_changed = True
            while number_of_nodes_changed and tree_counter.get_count() <= limit:
                number_of_nodes_changed = tl.add_child_to_node_layers(tree_counter, mapper, limit)
        return mapper


class TreeLayer:

    def __init__(self):
        self.node_layers = []

    def add_node_layer(self, node_layer):
        self.node_layers.append(node_layer)

    def get_node_layers(self):
        return self.node_layers

    def add_child_to_node_layers(self, tree_counter, mapper, limit):
        at_least_one_child_added = False
        for nl in self.get_node_layers():
            if tree_counter.get_count() <= limit:
                added = nl.add_child(tree_counter, mapper)
                if added:
                    at_least_one_child_added = True
        return at_least_one_child_added


class NodeLayer:

    def __init__(self, node, children):
        self.node = node
        self.children = children
        if self.children is None:
            self.iter = iter(())
        else:
            self.iter = iter(self.children)

    def add_child(self, tree_counter, mapper):
        child = next(self.iter, None)
        if child is not None:
            if self.node not in mapper:
                cloned_node = copy.copy(self.node)
                if cloned_node.children is not None:
                    cloned_node.children = []
                mapper[self.node] = cloned_node
            cloned_child = copy.copy(child)
            if cloned_child.children is not None:
                cloned_child.children = []
            mapper[self.node].add(cloned_child)
            mapper[child] = cloned_child
            if child.isLeaf():
                tree_counter.increase()
            return True
        return False


class TreeCounter:

    def __init__(self):
        self.count = 1

    def increase(self):
        self.count = self.count + 1

    def get_count(self):
        return self.count
