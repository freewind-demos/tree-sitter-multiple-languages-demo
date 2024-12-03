// Rust示例：展示所有权系统、模式匹配和生命周期

#[derive(Debug)]
struct Person<'a> {
    name: &'a str,
    age: u32,
}

impl<'a> Person<'a> {
    fn new(name: &'a str, age: u32) -> Self {
        Person { name, age }
    }
}

fn main() {
    let person = Person::new("Alice", 30);
    
    // 模式匹配
    match person.age {
        0..=17 => println!("未成年"),
        18..=60 => println!("成年人"),
        _ => println!("老年人"),
    }

    // Option处理
    let maybe_name: Option<&str> = Some("Bob");
    if let Some(name) = maybe_name {
        println!("Name is {}", name);
    }
}
