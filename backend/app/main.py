from datetime import datetime
from enum import Enum
from uuid import UUID, uuid4
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="AutoComp Corp Service", version="0.1.0")

class ControlLevel(str, Enum):
    observe = "L0_OBSERVE"
    draft = "L1_DRAFT"
    approval = "L2_APPROVAL_REQUIRED"
    professional = "L3_PROFESSIONAL_REVIEW"

class ComplianceEvent(BaseModel):
    entity_id: UUID
    jurisdiction: str = Field(min_length=2, max_length=80)
    event_type: str = Field(min_length=2, max_length=120)
    source_ref: str = Field(min_length=2, max_length=500)
    source_observed_at: datetime
    confidence: float = Field(ge=0, le=1)
    consequence: str = Field(default="routine", pattern="^(routine|material|high)$")

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

@app.post("/v1/events/evaluate")
def evaluate_event(event: ComplianceEvent) -> dict[str, str]:
    # This is a routing skeleton, not a legal rules engine. Production decisions
    # must come from versioned jurisdiction rules with source provenance.
    if event.confidence < 0.70 or event.consequence == "high":
        level = ControlLevel.professional
    elif event.consequence == "material":
        level = ControlLevel.approval
    elif event.confidence >= 0.95:
        level = ControlLevel.draft
    else:
        level = ControlLevel.observe

    return {
        "finding_id": str(uuid4()),
        "control_level": level.value,
        "status": "classified"
    }
