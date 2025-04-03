
export const getRandomCarName = () => {
  const carBrands = ['Tesla', 'Ford', 'BMW', 'Audi', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Hyundai', 'Mercedes'];
  const carModels = ['Model S', 'Mustang', 'X5', 'A4', 'Camaro', 'Corolla', 'Civic', 'Altima', 'Elantra', 'C-Class'];

  const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
  const model = carModels[Math.floor(Math.random() * carModels.length)];

  return `${brand} ${model}`;
};

export const getRandomColor = () => {
  const randomColorValue = () => {
    const value = Math.floor(Math.random() * 256); 
    return value.toString(16).padStart(2, '0'); 
  };

  const r = randomColorValue();
  const g = randomColorValue();
  const b = randomColorValue();

  return `#${r}${g}${b}`; 
};
