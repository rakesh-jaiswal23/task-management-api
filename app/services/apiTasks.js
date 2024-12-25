import supabase from "./supabase";

// get task
export async function getTasks() {
  try {
    const { data, error } = await supabase.from("tasks").select("*");

    if (error) {
      throw new Error("Tasks could not be loaded. Please try again later.");
    }

    return data;
  } catch (error) {
  
    throw error;
  }
}

//add  new task

export async function addTask(task) {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert([task])
      .select();
    if (error) throw new Error(error);
    return data;
  } catch (error) {
  
    throw error;
  }
}

//update task 
export async function updateTask(Id, formData) {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .update(formData)
      .eq("id", Id)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
   
    throw error;
  }
}
//delete task
export async function deleteTask(id) {
  try {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      throw new Error(`Failed to delete task with ID ${id}: ${error.message}`);
    }
  } catch (error) {
   
    throw error;
  }
}

//get  task by id
export async function getTaskById(id) {
  try {
    const { data, error } = await supabase
      .from("tasks") 
      .select("*") 
      .eq("id", id)
      .single(); 

    if (error) {
      throw new Error(`Failed to fetch task with ID ${id}: ${error.message}`);
    }

    return data; 
  } catch (error) {
  
    throw error;
  }
}
