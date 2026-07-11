package main

import (
	"fmt"
	"todo/todo"
)

func main() {
	task1 := todo.NewTask("Уроки", "Английский язык")
	task2 := todo.NewTask("Покупки", "сыр")
	task3 := todo.NewTask("Развлечения", "сходить в кино")

	list := todo.NewList()
	list.AddTask(task1)
	list.AddTask(task2)
	list.AddTask(task3)

	fmt.Println("----------")

	fmt.Println(list.CompleteTask("Покупки"))
	fmt.Println("----------")

	for _, v := range list.ListCompletedTasks() {
		fmt.Println(v)
	}
	fmt.Println("----------")

	for _, v := range list.ListTasks() {
		fmt.Println(v)
	}

}
