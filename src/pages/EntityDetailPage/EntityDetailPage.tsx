import { Alert, Box } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { ErrorBoundary } from "@/shared";
import { 
  EntityForm, 
  EntityDetailHeader, 
  EntityDetailContent, 
  EntityDetailSkeleton 
} from "@/features/entity";
import { getEntityConfig } from "@constants/entityConfigs";
import { useEntity } from "@hooks/useEntity";
import type { EntityType } from "@/types";

interface EntityDetailPageProps {
  entityType: EntityType;
}

const EntityDetailPage: React.FC<EntityDetailPageProps> = ({ entityType }) => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);

  const {
    entity,
    isLoading,
    error,
    isError,
    hasLocalEdits,
    saveLocalEdit,
    clearLocalEdit,
  } = useEntity(entityType, id || "");

  const config = getEntityConfig(entityType);

  if (!id) {
    return <Navigate to={`/${entityType}`} replace />;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (formData: Record<string, unknown>) => {
    saveLocalEdit(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleRestore = () => {
    clearLocalEdit();
  };

  if (isLoading) {
    return (
      <ErrorBoundary>
        <EntityDetailSkeleton />
      </ErrorBoundary>
    );
  }

  if (isError) {
    return (
      <ErrorBoundary>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error?.message ||
            `Failed to load ${config.name.toLowerCase()} details. Please try again.`}
        </Alert>
      </ErrorBoundary>
    );
  }

  if (!entity) {
    return (
      <ErrorBoundary>
        <Alert severity="warning" sx={{ mb: 3 }}>
          {config.name} not found.
        </Alert>
      </ErrorBoundary>
    );
  }

  if (isEditing) {
    return (
      <ErrorBoundary>
        <EntityForm
          entityType={entityType}
          entity={entity as unknown as Record<string, unknown>}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Box>
        <EntityDetailHeader
          entity={entity}
          config={config}
          entityId={id}
          entityType={entityType}
          hasLocalEdits={hasLocalEdits}
          onEdit={handleEdit}
          onRestore={handleRestore}
        />
        <EntityDetailContent entity={entity} config={config} />
      </Box>
    </ErrorBoundary>
  );
};

export default EntityDetailPage;
