import { ResultFont } from "./Fonts"
import React from "react"

const mask =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAAwCAYAAABE+Xs2AAAHs0lEQVR4Xu1caUhUXRh+J8ssUwPNbNPQdrTFICEwWiztTyRKG7RQJIFFC0XRAoGFYLRT0ILVn1QKQaOdNn9EG2oWSmVltEebtmKpH8/5mO9zxrl3ziz33pm57wuDQXPPec/zPnPOu51rIaI2YmEETISAhUlvImvzUgUCTHomgukQYNKbzuS8YCY9c8B0CDDpTWdyXjCTnjlgOgSY9KYzOS+YSc8cMB0CTHoTmDw6OppWrlxJZ86coVu3bgXEisPDwykvL0+sZcuWLdTU1CS9Lia9NFT+98WRI0dSRUUFRURE2Cjf2tpKixcvppMnT9KfP38MWdiECROoU6dObs3948cPWrp0qfhAmpubaebMmXTx4kXC2pwJk94ZQn76/0lJSXT16lWKiopyuILv37/TpEmT6N69e7qvcMSIEfTgwQO3Sf/z50/q3r27jd7Y6efMmUPnz593uh4mvVOI/PMLr1+/pr59+6oqD9Jfv35d9wWWlpZSZmamJvOuWbOGDhw4IHZ/JWHSawK98YO2tTnvIzSK9LNmzaKSkhJNQPr16xdt2rSJdu/ezaTXBGGVQceNG2dzBMOduH//vm4+NHz1zp07++ROD6VkfpSe2GzevHlUVFTkcAje6T1BVuHZ8ePH0+XLlzuQfvny5XTixAkNZuw4JDIbmzdv9lnSwy/v1q2bZlhcu3aNJk+e7Jz0/fv3p4SEBPr06RM9fPhQM4UCeeCUlBQC4I4MisxCUFCQLssfPXq00KNnz56K802cOJFu3Lihiz72k2RkZIidWE0/TxSTIj3SW6dPn6bBgwfTx48f6fjx47Ru3TpP5jXlsyASAFcMoiw4XLUXpAPT09Pp3LlzDieDewGf3ijSQ79Ro0bRsmXLROrRYrEIlwcfd1OZ7Re6ceNGys/Pd7zTp6amtmGSIUOG0OHDhxWtAWWOHDkifgiuFAK0N69vzeArpLei8uTJExo0aFAHkMrLy2n+/Pk+Z8vIyEgRhA4YMIBevHhBixYtErp36dJF1BWys7NVDY5Ypri4mBYsWKC88fz9+1eQHlGvfe7T0VNHjx79ryjgW3TzDW18jfSJiYmEFCFOcEhLS4vYAffs2SPcWH+RsrIymjJlCoWGhqpuzNjh9+/fTyhgKZ62bS6G0XV1dTR9+nTxK2TpiEBDQwPFxcUZ7t4Eim1mzJhBhw4dopiYGNUlff36lZCxkSpOuUp6zFxZWUljx44NFFy9ug4Eq/BPFXcZnXx6ry7KoMG2bt1Ka9euVd3dodqXL19EpqampkauDcEd0mMiHBBW48LXh3Jm9vXDwsJo+/bttGLFCkWKwLVwljs3iF8+NS3iSwTZe/fupa5duzrVDX78woULqb6+nh4/fkyNjY2qz1i+ffvWhvQa/HpPIud9+/aJTj6zybBhw2jXrl3Uq1cvGjNmjGpKctu2baIjkEUZgeHDh9PZs2dp4MCBqiem/QjgLgqAID08kZycHOXT1v4VIFVVVYQcr6tiNtJjo8jNzaWCggIp47x9+1YEYoiJWBwjgFgRASsyNZ4IXEwE6cj27Ny5k16+fGkzXIeKLKL8CxcuUHx8vPS8ZnRvlixZIhqbZI5fADlt2jRRpWVxjAB4h/pGv379vArR06dPCR+kZz98+CDGdtiGgNZPFKpwdDsKyn7//i0UPHbsGJ06dcqrSvrDYEgDImhSC1it64C/efDgQVq1apU/LM0QHYcOHSr6kmQ3EHeUrK2tFcHu+/fvlV/21Lt3b0XSI6d/+/Ztd+b2+2fQn44dW9YFvHv3rgjK1PLGfg+KBwuA7440IzZYLaV9BZobzlxEOjU1VZxysj00V65cobS0NBdnMcfXceUP1Vfc4tJDcNpWV1fza/1cBfvSpUs0depU6ccQ7MK9YbFFAIQvLCykrKws3aCx1mF5p3cBcmQD5s6dK/3EnTt3CF2XLLYIwEUEjsj4GSFMeknUsTPBrUlOTpZ64tmzZ+JKHAJelv8RgKuHNCKSAd7opnQHWya9AmrBwcEiWLU24aGvw3r7Xg1oHKG4bI2UJi4/s/yLADYA9M9rmaGRxZpJr4DU6tWrCRVUmc7T9kOgGojUmLNSuKyBAuF7uKyNlnRHTWPWV3a4s+u3b4WRwQmBrGrKUmaQQP4ObtO7WhlEtRWtxdYiSCDj48raUGVFt6Qngr4l6w9Dpj5iPxfsidTxzZs3OXujZAjc1setfVnZsWOH8FWxk7DYIoD2C9Q23CGrt7B89OgR4dOjRw8mvRKo1hs8eGmSWiEKbgzerDV79mxv2Scgx0EAixQl7mHbkx9uCtyc58+fE+4jIAmAQBcX7LUQ9umdoBobGyuyNva9SDAUdq8NGzaIErrM6+S0MKA/jYmW4T59+gjSY/cHdvg3WoKRvsQVxlevXoklrV+/Xtzw0uJ0YNJLsAa9SLiCBp/y8+fPwiAwFIt2CISEhIhEAlqN3717R2/evBGNY7hMjr9oI8abOyD4f3wPLzdAOwNaPnBvAa4MblThLwR/kT1i0mtnNx5ZZwRAaFyCVyI97tfix8Sk19kwPJ3xCDDpjbcBa6AzAkx6nQHn6YxHgElvvA1YA50RYNLrDDhPZzwCTHrjbcAa6IwAk15nwHk64xFg0htvA9ZAZwT+AQ+k7L1iwkjJAAAAAElFTkSuQmCC"

export const Title = () => {
  return (
    <h1>
      <ResultFont mask={mask}>ショッパーズ</ResultFont>マスクジェネレータ
    </h1>
  )
}
