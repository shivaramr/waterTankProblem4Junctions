function transformArr(arr) {
  let result = [...arr];
  result = result.reduce((acc, curr, idx) => {
    if (idx === 0 || idx === arr.length - 1 || curr > 0) {
      return [...acc, curr];
    }
    const prev = acc[acc.length - 1];
    const next = arr[idx + 1];
    if (prev === 0) {
      return [...acc, 0];
    }
    const checkArr = [prev, next, curr].filter((num) => num > 0);
    const value = Math.min(...checkArr);
    return [...acc, value];
  }, []);
  result = result.map((item, idx) => (item === arr[idx] ? 0 : item));
  return result;
}

function validateInput() {
  const inputField = document.getElementById("numberArray");
  const errorMessage = document.getElementById("error-message");

  try {
    const parsedArray = JSON.parse(inputField.value);

    if (Array.isArray(parsedArray) && parsedArray.every((num) => typeof num === "number")) {
      errorMessage.textContent = "";
      const height = Math.max(...parsedArray) + 1;
      const width = parsedArray.length;
      const container = document.getElementById("tableContainer");
      container.innerHTML = "";
      const table = document.createElement("table");

      table.append(
        ...Array.from({ length: height }, (_, rowIndex) => {
          const row = document.createElement("tr");

          row.append(
            ...Array.from({ length: width }, (_, colIndex) => {
              const cell = document.createElement("td");
              const colorThreshold = parsedArray[colIndex];
              if (height - rowIndex <= colorThreshold && colorThreshold > 0) {
                cell.classList.add("colored");
              }
              return cell;
            })
          );

          return row;
        })
      );
      container.appendChild(table);

      const container1 = document.getElementById("tableContainer1");
      container1.innerHTML = "";
      const table1 = document.createElement("table");

      const waterArray = transformArr(parsedArray);
      const stored = waterArray.reduce((acc, curr) => acc + curr, 0);
      const answerTag = document.getElementById("answer");
      answerTag.textContent = `${stored} Units`;

      Array.from(table.rows).forEach((row, rowIndex) => {
        Array.from(row.cells).forEach((cell, colIndex) => {
          const waterLevel = waterArray[colIndex];
          if (height - rowIndex <= waterLevel && waterLevel > 0) {
            cell.classList.add("rectangle");
          }
        });
      });

      table1.append(
        ...Array.from({ length: height }, (_) => {
          const row = document.createElement("tr");

          row.append(
            ...Array.from({ length: width }, (_) => {
              const cell = document.createElement("td");
              return cell;
            })
          );

          return row;
        })
      );
      Array.from(table1.rows).forEach((row, rowIndex) => {
        Array.from(row.cells).forEach((cell, colIndex) => {
          const waterLevel = waterArray[colIndex];
          if (height - rowIndex <= waterLevel && waterLevel > 0) {
            cell.classList.add("rectangle");
          }
        });
      });
      container.appendChild(table1);
    } else {
      throw new Error("Input must be an array of numbers (e.g., [1, 2, 3])");
    }
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}
