import { generateInputId } from 'modules/Inputs/helpers';
import type { PredictionPayload } from 'modules/Predictions/CreatePrediction'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = object

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // dummy code to send success for the Orange image and error for everything else
  const body = JSON.parse(req.body) as PredictionPayload;
  if (body.input.name.includes('img_1')) {
    res.status(200).json({ ...makeMockResponse(body), input: body.input })
  } else {
    res.status(500).json({
      title: body.title,
      description: body.description,
      predict: { error: true, description: 'Could not run predictions, please contact support.' }
    })
  }
}


function makeMockResponse({ title, description }: { title: string; description: string; }) {
  return {
    id: generateInputId(),
    title,
    description,
    "predict": {
      "description": "Detected objects",
      "predictions": [
        {
          "bbox": {
            "x1": 589,
            "x2": 1443,
            "y1": 92,
            "y2": 927
          },
          "label": "orange",
          "score": "0.97"
        },
        {
          "bbox": {
            "x1": -1,
            "x2": 1617,
            "y1": 25,
            "y2": 1193
          },
          "label": "bowl",
          "score": "0.29"
        },
        {
          "bbox": {
            "x1": -3,
            "x2": 801,
            "y1": 1,
            "y2": 204
          },
          "label": "person",
          "score": "0.28"
        }
      ]
    }
  }
}