# Python示例：展示装饰器、列表推导式和with语句等Python特有特性

@dataclass
class Person:
    name: str
    age: int

    def greet(self):
        return f"Hello, {self.name}!"

# 列表推导式
squares = [x**2 for x in range(10) if x % 2 == 0]

# with语句和上下文管理器
with open('test.txt', 'w') as f:
    f.write('Hello, Tree-sitter!')
