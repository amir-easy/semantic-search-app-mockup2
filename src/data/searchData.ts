export interface SearchResult {
  name: string;
  description: string;
  rating: number;
  distance: string;
  address: string;
}

async function callPythonAPI(data: string) {
    try {
        const response = await fetch('http://localhost:5000/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });
        const result = await response.json();
        console.log('Response from Python API:', result);
    } catch (error) {
        console.error('Error calling Python API:', error);
    }
}


export const mockSearch = (query: string): SearchResult[] => {
  const results: SearchResult[] = [
    {
      name: 'קמילה',
      description: 'קמילה מסעדת בשרים כשרה בהגשחת בד"צ בית יוסף גריל פחמים לוהט למשך כל שעות היום סלטים טריים שנעשים במקום מידי יום ביומו שמוגשים עם פרנות ולאפות חמות.\n המסעדה ממוקמת במתחם ישפרו סנטר קריית-גת.\nעסקיות צהריים עשירות ואטרקטיביות בכל יום בין השעות 12:00-17:00\nבכל מוצאי שבת מתקיים ספיישל המבורגר עם תוספות מושחתות.\n המקום מעוצב בסגנון מודרני בגווני עץ המשרה לסועדים אווירה חמה וביתית',
      rating: 4.5,
      distance: '0.5 km',
      address: '123 Main St'
    },
    {
      name: 'משתלות אלפרדוס',
      description: '🌸 משתלה איכותית המעניקה מגוון של שירותים ומציעה מגוון מוצרים: עצים, שיחים, פרחים, חומרי דישון, אביזרים לבריכות נוי, כדים, אדניות, אבני טוף, מזרקות רשתות צל, דשא סינטטי, כלי עבודה לגנן ועוד. 🌸 שירות אדיב ומקצועי המותאם לצרכי הלקוח! המשתלה ממוקמת בכביש 55 באלפי מנשה.',
      rating: 4.8,
      distance: '1.2 km',
      address: '456 Book Lane'
    },
    {
      name: 'Green Bistro',
      description: 'Eco-friendly restaurant with outdoor seating',
      rating: 4.3,
      distance: '0.8 km',
      address: '789 Green Ave'
    }
  ];

  // Simple search implementation
  if (!query) return results;
  
  const searchTerms = query.toLowerCase().split(' ');
  return results.filter(result => 
    searchTerms.some(term => 
      result.name.toLowerCase().includes(term) ||
      result.description.toLowerCase().includes(term) ||
      result.address.toLowerCase().includes(term)
    )
  );
};