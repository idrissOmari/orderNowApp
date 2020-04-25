package fr.omatech.ordernow.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link fr.omatech.ordernow.domain.Formula} entity.
 */
public class FormulaDTO implements Serializable {
    
    private Long id;

    private String label;

    private BigDecimal price;


    private Long menuId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FormulaDTO formulaDTO = (FormulaDTO) o;
        if (formulaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formulaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FormulaDTO{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", price=" + getPrice() +
            ", menuId=" + getMenuId() +
            "}";
    }
}
