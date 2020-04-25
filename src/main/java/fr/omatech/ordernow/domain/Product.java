package fr.omatech.ordernow.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price", precision = 21, scale = 2)
    private BigDecimal price;

    @ManyToOne
    @JsonIgnoreProperties("listProducts")
    private MenuCategory menuCategory;

    @ManyToOne
    @JsonIgnoreProperties("listProducts")
    private Formula formula;

    @ManyToMany(mappedBy = "listProducts")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<FormulaOrder> listFormulas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Product price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public MenuCategory getMenuCategory() {
        return menuCategory;
    }

    public Product menuCategory(MenuCategory menuCategory) {
        this.menuCategory = menuCategory;
        return this;
    }

    public void setMenuCategory(MenuCategory menuCategory) {
        this.menuCategory = menuCategory;
    }

    public Formula getFormula() {
        return formula;
    }

    public Product formula(Formula formula) {
        this.formula = formula;
        return this;
    }

    public void setFormula(Formula formula) {
        this.formula = formula;
    }

    public Set<FormulaOrder> getListFormulas() {
        return listFormulas;
    }

    public Product listFormulas(Set<FormulaOrder> formulaOrders) {
        this.listFormulas = formulaOrders;
        return this;
    }

    public Product addListFormula(FormulaOrder formulaOrder) {
        this.listFormulas.add(formulaOrder);
        formulaOrder.getListProducts().add(this);
        return this;
    }

    public Product removeListFormula(FormulaOrder formulaOrder) {
        this.listFormulas.remove(formulaOrder);
        formulaOrder.getListProducts().remove(this);
        return this;
    }

    public void setListFormulas(Set<FormulaOrder> formulaOrders) {
        this.listFormulas = formulaOrders;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
