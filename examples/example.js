// JavaScript示例：展示异步编程、解构赋值和箭头函数

// 异步函数和Promise
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// 解构赋值
const person = {
    name: 'Alice',
    age: 30,
    address: {
        city: 'New York',
        country: 'USA'
    }
};

const { name, age, address: { city } } = person;

// 箭头函数和数组方法
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers
    .filter(n => n % 2 === 0)
    .map(n => n * 2);
